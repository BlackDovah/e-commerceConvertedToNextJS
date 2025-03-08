'use client';

import {
  Title,
  Box,
  Image,
  Group,
  Stack,
  Text,
  NumberInput,
} from "@mantine/core";
import { useProduct } from "@/components/Contexts/ProductContext";
import { ProductDetailsAndPurchase } from "@/components/ProductDetailsAndPurchase/ProductDetailsAndPurchase";
import { AddToCartButton } from "@/components/Cart/AddToCartButton";

export default function DetailedProductDisplay() {
  const { selectedProduct } = useProduct();

  return (
    <Box>
      {/* Main content */}
      <Box className="mx-10">
        {selectedProduct && (
          <Box className="justify-center items-center pt-20">
            <Group className="flex justify-center items-start">
              <Image
                src={selectedProduct.image}
                alt={selectedProduct.title}
                className="max-w-xs max-h-xs"
              />
              <Stack>
                <Title>{selectedProduct.title}</Title>
                <Title className="text-[#B07D43] font-bold">{`${selectedProduct.price} $`}</Title>
                <Text>{selectedProduct.description}</Text>
                <Group>
                  <NumberInput
                    min={1}
                    max={99}
                    styles={{ input: { width: "80px" } }}
                  />
                  <AddToCartButton book={selectedProduct} />
                  <ProductDetailsAndPurchase book={selectedProduct} />
                </Group>
              </Stack>
            </Group>
            <Box className="flex justify-center items-center bg-gray-100 mt-10">
              <p className="text-lg">{selectedProduct.description}</p>
            </Box>
          </Box>
        )}
      </Box>

      {/* End of the main content */}

    </Box>
  );
}
