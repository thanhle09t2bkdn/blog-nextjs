"use client";

import Loading from "@/app/loading_screen";
import { httpRequest } from "@/lib/apis/httpRequest";
import { usePathname, useRouter } from "next/navigation";
import { useUser } from "@/hooks/use-user";
import { Role } from "@/types";
import { ApiUrl } from "@/constants/api-url";
import { getCookie } from "cookies-next";
import { useCurrency } from "@/hooks/use-currency";
import { useEffectOnce } from "@/hooks/use-effect-once";
import { AppRoutes } from "@/constants/route";

interface AuthWrapperProps {
  children: React.ReactNode;
}

const AuthWrapper: React.FC<AuthWrapperProps> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { isLoggedIn, user, setIsLoggedIn, setUser } = useUser();
  const { currencies, setCurrencies, setCurrency } = useCurrency();

  useEffectOnce(() => {
    const checkLoginStatus = async () => {
      try {
        const currency = getCookie("currency");
        if (currency) {
          setCurrency(JSON.parse(currency));
        }

        const isPublicPage = AppRoutes.Public.some((page) =>
          pathname.includes(page)
        );
        const isManagePage = pathname.includes("/manage");
        const hasAccessToken = !!getCookie("accessToken");

        if (isPublicPage && !hasAccessToken && !isManagePage) {
          return true;
        }

        if (!hasAccessToken || (!user && isManagePage)) {
          setIsLoggedIn(false);
          return router.push("/");
        }

        if (user?.role !== Role.Admin && isManagePage) {
          return router.push("/404");
        }

        const [userResponse, currenciesResponse] = await Promise.all([
          httpRequest.get(ApiUrl.GET_PROFILE),
          httpRequest.get(ApiUrl.CURRENCIES),
        ]);

        setCurrencies(currenciesResponse.data?.result?.data || currencies);
        setCurrency(currenciesResponse.data?.result?.data[0] || currencies[0]);

        if (userResponse.status === 200) {
          const user = userResponse.data?.result;
          setUser(user);
          setIsLoggedIn(true);

          const isAdmin = user?.role === Role.Admin;
          const isAccessingAdminPage = AppRoutes.Admin.some((page) =>
            pathname.includes(page)
          );

          const redirectPath =
            !isAdmin && isAccessingAdminPage
              ? "/404"
              : isAdmin && !isAccessingAdminPage
              ? "/manage/dashboard"
              : pathname;

          router.push(redirectPath);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        setIsLoggedIn(false);
      }
    };

    checkLoginStatus();
  });

  if (
    (!isLoggedIn || !user) &&
    !AppRoutes.Public.some((page) => pathname.includes(page))
  ) {
    return <Loading />;
  }

  return <>{children}</>;
};

export default AuthWrapper;
