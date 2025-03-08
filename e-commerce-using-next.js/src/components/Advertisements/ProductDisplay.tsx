'use client';

import { Box, LoadingOverlay } from "@mantine/core";
import { ProductCard } from "./ProductCard";
import { useProduct } from "@/components/Contexts/ProductContext";
import { useBooks } from "@/components/Contexts/BooksContext";
import { ProductCardProps } from "@/types/types";
import { useRouter } from 'next/navigation';

export function ProductDisplay() {
  const { books, isLoading, error } = useBooks();
  const router = useRouter();
  const { setSelectedProduct } = useProduct();
  const handleProductClick = (product: ProductCardProps) => {
    setSelectedProduct(product);
    router.push(`/Product/${product.title}`);
  };

  // Conditional rendering for loading and error states
  if (isLoading) {
    return <LoadingOverlay visible />;
  }
  if (error) {
    return <div>{error}</div>;
  }
  if (!books) {
    return null;
  }

  const topBooks = Object.entries(books)
    .flatMap(([, bookList]) =>
      Object.entries(bookList).map(([, item]) => item as ProductCardProps)
    )
    .slice(5, 9);

  return (
    <div className="grid grid-cols-4 max-lg:grid-cols-2 max-sm:grid-cols-1 gap-4">
      {topBooks.map((item, index) => (
        <Box key={index} className="flex justify-center">
          <ProductCard
            image={item.image}
            title={item.title}
            author={item.author}
            cover={item.cover || ""}
            price={item.price}
            description={item.description}
            ID={item.ID}
            onImageClick={() => handleProductClick(item)}
          />
        </Box>
      ))}
    </div>
  );
}
