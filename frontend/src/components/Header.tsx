"use client";

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, CheckSquare, Zap, Shield, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetDescription,
} from "@/components/ui/sheet";
import { useAuth } from "@/context/AuthContext";

const navItems = [
  { href: "#features", label: "Features", icon: Zap },
  { href: "#how-it-works", label: "How It Works", icon: CheckSquare },
  { href: "#security", label: "Security", icon: Shield },
  { href: "#team", label: "Team", icon: Users },
];

export function Header() {
  const { user, loading } = useAuth();
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const isAuthed = Boolean(user);
  const showAuthedActions = !loading && isAuthed;
  const showGuestActions = !loading && !isAuthed;

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-md border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        {/* Changed h-16 relative to setup centralized nav */}
        <div className="flex items-center justify-between h-16 relative">

          {/* Logo Section - Flex Start */}
          <div className="flex-1 flex justify-start">
             <Link href="/" className="flex items-center gap-3 group">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/30 group-hover:shadow-blue-500/50 transition-shadow">
                <CheckSquare className="w-5 h-5 text-white" />
              </div>
              <motion.div
                className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
              />
            </motion.div>
            <div className="flex flex-col">
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                TaskFlow
              </span>
              <span className="text-xs text-muted-foreground tracking-wider">
                ORGANIZE • ACHIEVE • GROW
              </span>
            </div>
          </Link>
          </div>

          {/* Desktop Navigation - Centered Absolutely */}
          {/* Changed hidden md:flex -> hidden min-[1001px]:flex */}
          <nav className="hidden min-[1001px]:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
            {navItems.map((item, index) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={item.href}>
                  <Button
                    variant="ghost"
                    className="text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors"
                  >
                    {item.label}
                  </Button>
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Desktop Actions - Right Aligned */}
          {/* Changed hidden md:flex -> hidden min-[1001px]:flex */}
          <div className="hidden min-[1001px]:flex items-center gap-3 flex-1 justify-end">
            {/* Loading State Skeleton */}
            {loading ? (
                <div className="flex items-center gap-3">
                   {/* Login buttons are roughly w-20, Get Started w-28 */}
                   <Skeleton className="h-10 w-20 rounded-md bg-white/5" />
                   <Skeleton className="h-10 w-28 rounded-md bg-white/5" />
                </div>
            ) : showAuthedActions ? (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Link href="/dashboard">
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-0">
                    Dashboard
                  </Button>
                </Link>
              </motion.div>
            ) : showGuestActions ? (
              <>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <Link href="/login">
                    <Button
                      variant="ghost"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      Login
                    </Button>
                  </Link>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <Link href="/register">
                    <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-0">
                      Get Started
                    </Button>
                  </Link>
                </motion.div>
              </>
            ) : null}
          </div>

          {/* Mobile Menu - Visible < 1000px */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild className="min-[1000px]:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="bg-background/95 backdrop-blur-md border-l border-white/10"
            >
              <SheetHeader className="text-left">
                <SheetTitle className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                    <CheckSquare className="w-4 h-4 text-white" />
                  </div>
                  TaskFlow
                </SheetTitle>
                <SheetDescription className="mt-2 text-sm text-muted-foreground/80 leading-relaxed text-left">
                  Manage your daily tasks, collaborate with your team, and boost productivity with TaskFlow.
                </SheetDescription>
              </SheetHeader>
              <nav className="flex flex-col gap-4 mt-8">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/5 transition-colors text-muted-foreground hover:text-foreground"
                    >
                      <item.icon className="w-5 h-5" />
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
                <div className="h-px bg-white/10 my-2" />

                {/* Mobile Menu Loading Skeleton */}
                {loading ? (
                    <div className="space-y-3">
                       <Skeleton className="h-10 w-full rounded-md bg-white/5" />
                       <Skeleton className="h-10 w-full rounded-md bg-white/5" />
                    </div>
                ): showAuthedActions ? (
                  <Link
                    href="/dashboard"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-0">
                      Dashboard
                    </Button>
                  </Link>
                ) : showGuestActions ? (
                  <>
                    <Link
                      href="/login"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-muted-foreground hover:text-foreground"
                      >
                        Login
                      </Button>
                    </Link>
                    <Link
                      href="/register"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-0">
                        Get Started
                      </Button>
                    </Link>
                  </>
                ) : null}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  );
}
