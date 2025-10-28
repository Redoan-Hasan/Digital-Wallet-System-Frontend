import React, { useState } from "react";
import { Link, NavLink } from "react-router";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import {
  authApi,
  useGetMyInfoQuery,
  useLogoutMutation,
} from "@/redux/features/auth/auth.api";
import { useAppDispatch } from "@/redux/hook";
import { Role } from "@/constants/role";

const Navbar = () => {
  const { data } = useGetMyInfoQuery();
  console.log(data);
  const [isOpen, setIsOpen] = useState(false);
  const [logout] = useLogoutMutation();
  const dispatch = useAppDispatch();
  const handleLogout = async () => {
    await logout();
    dispatch(authApi.util.resetApiState());
  };

  const navOptions = [
    { name: "Home", path: "/", role: "ALL" },
    { name: "About", path: "about", role: "ALL" },
    { name: "Features", path: "features", role: "ALL" },
    { name: "Contact Us", path: "contact", role: "ALL" },
    { name: "FAQ", path: "faq", role: "ALL" },
    { name: "Dashboard", path: "/admin", role: Role.ADMIN },
    { name: "Dashboard", path: "/agent", role: Role.AGENT },
    { name: "Dashboard", path: "/user", role: Role.USER },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo and Brand Name */}
          <div className="shrink-0">
            <Link to="/" className="flex items-center space-x-2">
              <img
                className="h-10 w-auto"
                src="/digital-wallet-system-logo-removebg-preview.png"
                alt="VaultPay"
              />
              <span className="text-2xl font-bold text-primary">VaultPay</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:block">
            <div className="ml-10 flex items-center space-x-4">
              {navOptions.map((item, index) => (
                <React.Fragment key={index}>
                  {item.role === "ALL" && (
                    <NavLink
                      key={item.name}
                      to={item.path}
                      className={({ isActive }) =>
                        `px-3 py-2 text-base font-medium text-primary transition-all duration-300 border-2 rounded-md hover:shadow-lg hover:shadow-primary/30 cursor-pointer ${
                          isActive ? "border-primary" : "border-transparent"
                        }`
                      }
                    >
                      {item.name}
                    </NavLink>
                  )}
                  {data?.data?.data?.role === item.role && (
                    <NavLink
                      key={item.name}
                      to={item.path}
                      className={({ isActive }) =>
                        `px-3 py-2 text-base font-medium text-primary transition-all duration-300 border-2 rounded-md hover:shadow-lg hover:shadow-primary/30 cursor-pointer ${
                          isActive ? "border-primary" : "border-transparent"
                        }`
                      }
                    >
                      {item.name}
                    </NavLink>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Desktop: Auth Buttons and Theme Toggle */}
          <div className="hidden lg:flex items-center space-x-4">
            <ModeToggle />
            {data?.data?.data?.email ? (
              <Button variant="default" onClick={handleLogout}>
                Logout
              </Button>
            ) : (
              <Button variant="default" asChild>
                <Link to="/login">Login</Link>
              </Button>
            )}
          </div>

          {/* Mobile: Theme Toggle and Menu Button */}
          <div className="-mr-2 flex items-center lg:hidden">
            <ModeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="ml-2 inline-flex items-center justify-center p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden border-t border-border" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navOptions.map((item, index) => (
              <React.Fragment key={index}>
                {item.role === "ALL" && (
                  <NavLink
                    key={item.name}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) =>
                      `block px-3 py-2 rounded-md text-base font-medium text-primary transition-colors cursor-pointer ${
                        isActive ? "bg-primary/10" : ""
                      }`
                    }
                  >
                    {item.name}
                  </NavLink>
                )}
                {data?.data?.data?.role === item.role && (
                  <NavLink
                    key={item.name}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) =>
                      `block px-3 py-2 rounded-md text-base font-medium text-primary transition-colors cursor-pointer ${
                        isActive ? "bg-primary/10" : ""
                      }`
                    }
                  >
                    {item.name}
                  </NavLink>
                )}
              </React.Fragment>
            ))}
          </div>
          {/* Mobile: Auth Buttons */}
          <div className="pt-4 pb-3 border-t border-border">
            <div className="px-2 space-y-2">
              {data?.data?.data?.email ? (
                <Button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="w-full"
                  variant="default"
                >
                  Logout
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    setIsOpen(false);
                  }}
                  className="w-full"
                  variant="default"
                  asChild
                >
                  <Link to="/login">Login</Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
