import Image from 'next/image';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/atoms/dropdown-menu';
import { Button } from '@/components/atoms/button';
import { useRouter } from 'next/navigation';
import { useUser } from '@/hooks/use-user';
import { useCurrency } from '@/hooks/use-currency';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useIsClient } from '@/hooks/use-is-client';

const MenuAccount = () => {
  const router = useRouter();
  const isClient = useIsClient();
  const { currencies, currency, setCurrency } = useCurrency();
  const { isLoggedIn, user, logout } = useUser();

  const handleClick = (path: string) => {
    router.push(path);
  };

  const handleLogout = () => {
    logout();
    router.push('/');
    router.refresh();
  };

  return !isLoggedIn && isClient ? (
    <Button
      className="bg-blue-700 font-medium text-base"
      onClick={() => handleClick('/login')}
    >
      Login
    </Button>
  ) : (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Image
          src={'/assets/icons/customer.svg'}
          height={28}
          width={28}
          alt={'setting'}
          className="cursor-pointer hover:scale-110 transition-all duration-300 hover:bg-blue-500 hover:p-1"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 rounded">
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Link
              className="flex items-center"
              href="/profile"
              prefetch={false}
            >
              <span>{user?.email}</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link
            className="flex items-center"
            href="/history-orders"
            prefetch={false}
          >
            <span>History Orders</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
          <span>Logout</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <div className="flex flex-col p-2">
          <div className="flex items-center mb-2">
            <span className="text-sm uppercase font-semibold">Currency</span>
          </div>
          <div className="flex flex-wrap gap-2 text-sm font-medium ml-6">
            {(currencies || []).map((item) => (
              <div
                key={item.code}
                className={cn(
                  'cursor-pointer flex items-center justify-center rounded-md px-1',
                  'hover:bg-blue-500 hover:text-white transition-all duration-300',
                  currency.code === item.code ? 'bg-blue-500 text-white' : '',
                )}
                onClick={() => setCurrency(item)}
              >
                <span>{item.code}</span>
              </div>
            ))}
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MenuAccount;
