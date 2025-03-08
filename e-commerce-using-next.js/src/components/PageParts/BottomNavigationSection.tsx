'use client';

import { Group, Box } from "@mantine/core";
import { CartView } from "../Cart/CartView";
import classes from "./Header.module.css";
import { useRouter } from 'next/navigation';
import { useTranslation } from "react-i18next";

export function BottomNavigationSection() {
  const { t } = useTranslation();
  const router = useRouter();

  const handleHomeClick = () => {
    router.push("/");
  };

  return (
    <Box hiddenFrom="xl" className="pt-5 flex sticky bottom-0 w-full justify-center bg-white border">
      <header className={classes.header}>
        <Group>
          <Group h="100%" gap={0}>
          <div 
              onClick={handleHomeClick}
              className={classes.link}
            >
              {t("navigation.home")}
            </div>
            <div className={classes.link}>
              <CartView />
            </div>
          </Group>
        </Group>
      </header>
    </Box>
  );
}
