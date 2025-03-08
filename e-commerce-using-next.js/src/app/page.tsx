'use client';

import { Stack, Title, Box } from "@mantine/core";
import { Advertisements } from "../components/Advertisements/Advertisements";
import { ProductDisplay } from "../components/Advertisements/ProductDisplay";
import { useTranslation } from "react-i18next";

export default function LandingPage() {
  const { t } = useTranslation();
  return (
    <Box>
      {/* Main content */}

      <Stack className="bg-gray-100" gap="lg">
        <Box>
          <Box className="justify-center items-center 2xl:px-80 max-2xl:px-20 pt-20">
            <Title className="text-4xl max-lg:text-3xl max-md:text-2xl mt-8 mb-8 justify-center">
              {t("landingPage.newArrivals")}
            </Title>
            <ProductDisplay />
          </Box>

          <Box className="justify-center items-center 2xl:px-80 max-2xl:px-20 py-20">
            <Title className="text-4xl max-lg:text-3xl max-md:text-2xl mt-8 mb-8 justify-center">
              {t("landingPage.featuredProducts")}
            </Title>
            <Advertisements />
          </Box>
        </Box>
      </Stack>
      {/* End of the main content */}

    </Box>
  );
}
