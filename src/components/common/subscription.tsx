"use client";
import React from "react";
import Text from "@/components/ui/text";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const FormSchema = z.object({
  subscription_email: z.string().email(),
});

const Subscription = ({ className = "" }: { className?: string }) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      subscription_email: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ subscription_email: data.subscription_email }),
      });
      if (response.status === 201) {
        toast.success("Subscription successful!");
      } else if (response.status === 409) {
        toast.warning("The email entered is already subscribed.");
      } else {
        toast.error("An error occurred while subscribing. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred while subscribing. Please try again.");
    } finally {
      form.reset();
    }
  }

  return (
    <div
      className={cn(
        `flex flex-col xl:flex-row justify-center xl:justify-between items-center bg-heading  px-4 py-10 sm:p-10 md:p-16`,
        className
      )}
    >
      <div className="lg:-mt-2 xl:-mt-0.5 text-center ltr:xl:text-left rtl:xl:text-right mb-7 md:mb-8 lg:mb-9 xl:mb-0">
        <Text
          variant="mediumHeading"
          className="sm:mb-0 md:mb-2.5 lg:mb-3 xl:mb-3.5 text-white"
        >
          Join Our Fashion Community Today!
        </Text>
        <p className="text-xs leading-6 text-gray-400 md:text-sm md:leading-7">
          Be the first to Know About Exclusive Offers, News, & More. Sign Up
          Now!
        </p>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full sm:w-96 md:w-[545px]"
        >
          <div className="flex flex-col items-start justify-end w-full gap-2 sm:flex-row">
            <FormField
              control={form.control}
              name="subscription_email"
              render={({ field }) => (
                <FormItem className="flex flex-1 w-full">
                  <FormControl>
                    <Input
                      placeholder="Your Email Address"
                      className="flex-1 w-full h-12 bg-white md:h-14"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full h-12 mt-3 sm:mt-0 md:w-32 sm:w-auto md:h-14 border-white border-2 hover:bg-white hover:text-heading"
            >
              Subscribe
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Subscription;
