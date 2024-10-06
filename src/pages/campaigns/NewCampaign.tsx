import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns";
import { Type, FileText, Send, Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import MDXComponent from "@/components/NewsletterComponents/MDXComponent";
import Sidebar from "@/components/Sidebar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { useRecoilState } from "recoil";
import { newCampaignMarkdownState } from "@/atoms/atoms";
import { marked } from "marked";

// Define allowed characters regex
const allowedCharsRegex = /^[a-zA-Z0-9",:?([]{},!& ]*$/;

// Define campaign schema with Zod
const campaignSchema = z.object({
  campaignTitle: z
    .string()
    .trim()
    .max(120, { message: "Title must be 120 characters or less." })
    .min(1, { message: "Title is required." })
    .regex(allowedCharsRegex, {
      message: "Title contains invalid characters.",
    }),

  blurb: z
    .string()
    .trim()
    .max(120, { message: "Blurb must be 120 characters or less." })
    .min(1, { message: "Blurb is required." })
    .regex(allowedCharsRegex, {
      message: "Blurb contains invalid characters.",
    }),

  frequency: z.enum(["Monthly", "Semesterly", "BiYearly", "Yearly", "None"]),

  campaignContent: z
    .array(
      z.object({
        content: z
          .string()
          .trim()
          .min(1, { message: "Content is required." }),
        scheduledOn: z.string().refine((date) => !isNaN(Date.parse(date)), {
          message: "Scheduled date is required and must be valid.",
        }),
      })
    )
    .length(1, { message: "Exactly one campaign content is required." }),
});

export default function NewCampaign() {
  const form = useForm<z.infer<typeof campaignSchema>>({
    resolver: zodResolver(campaignSchema),
    defaultValues: {
      campaignContent: [{ content: "", scheduledOn: "" }], // Default for one content entry
    },
  });

  const [titleCount, setTitleCount] = useState("0/120");
  const [blurbCount, setBlurbCount] = useState("0/120");
  const [content] = useRecoilState(newCampaignMarkdownState);
  const rawhtml = marked(content);

  useEffect(() => {
    document.title = "ACE | Add New Campaign";
  }, []);

  function onSubmit(values: z.infer<typeof campaignSchema>) {
    console.log(values);
    // Handle form submission logic
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 p-6 flex justify-center items-center">
        <Card className="w-full max-w-5xl border-border border-2 rounded-lg">
          <CardHeader>
            <CardTitle className="text-6xl text-center font-bold pb-4">
              Create New Campaign
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="edit" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="edit">Edit</TabsTrigger>
                <TabsTrigger value="preview">Preview</TabsTrigger>
              </TabsList>
              <TabsContent value="edit">
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                  >
                    <FormField
                      control={form.control}
                      name="campaignTitle"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-lg">Title</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Type className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                              <Input
                                placeholder="Campaign title"
                                className="pl-10 pr-16"
                                {...field}
                                onChange={(e) => {
                                  field.onChange(e);
                                  setTitleCount(`${e.target.value.length}/120`);
                                }}
                              />
                              <span className="absolute right-3 top-3 text-xs text-muted-foreground">
                                {titleCount}
                              </span>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="blurb"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Blurb</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <FileText className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                              <Input
                                placeholder="Short description"
                                className="pl-10 pr-16"
                                {...field}
                                onChange={(e) => {
                                  field.onChange(e);
                                  setBlurbCount(`${e.target.value.length}/250`);
                                }}
                              />
                              <span className="absolute right-3 top-3 text-xs text-muted-foreground">
                                {blurbCount}
                              </span>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Frequency Selection */}
                    <FormField
                      control={form.control}
                      name="frequency"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Frequency</FormLabel>
                          <FormControl>
                            <select className="border rounded p-2" {...field}>
                              <option value="Monthly">Monthly</option>
                              <option value="Semesterly">Semesterly</option>
                              <option value="BiYearly">BiYearly</option>
                              <option value="Yearly">Yearly</option>
                              <option value="None">None</option>
                            </select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Single Content Entry */}
                    <FormField
                      control={form.control}
                      name="campaignContent.0.content"
                      render={({ field }) => {
                        const [content, setContent] = useRecoilState(
                          newCampaignMarkdownState
                        );

                        return (
                          <FormItem>
                            <FormLabel>Content</FormLabel>
                            <FormControl>
                              <MDXComponent
                                content={content}
                                setContent={(newContent) => {
                                  setContent(newContent);
                                  field.onChange(newContent);
                                }}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        );
                      }}
                    />
                    <FormField
                      control={form.control}
                      name="campaignContent.0.scheduledOn"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Launch Date</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "w-[280px] pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  {field.value ? (
                                    format(new Date(field.value), "d MMM, yyyy")
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent
                              className="w-auto p-0"
                              align="start"
                            >
                              <Calendar
                                mode="single"
                                selected={
                                  field.value
                                    ? new Date(field.value)
                                    : undefined
                                }
                                onSelect={(date) =>
                                  field.onChange(date ? date.toISOString() : "")
                                }
                                disabled={(date) =>
                                  date < new Date() ||
                                  date < new Date("1900-01-01")
                                }
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          <FormDescription>
                            Choose the launch date for your campaign.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="flex space-x-2 col-span-2">
                      <Button type="submit" className="flex-1">
                        <Send className="mr-2 h-4 w-4" /> Submit Campaign
                      </Button>
                    </div>
                  </form>
                </Form>
              </TabsContent>
              <TabsContent value="preview">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-lg">Title</h3>
                    <p>{form.watch("campaignTitle") || "No title set"}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Blurb</h3>
                    <p>{form.watch("blurb") || "No blurb set"}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Frequency</h3>
                    <p>{form.watch("frequency") || "No frequency set"}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Content</h3>
                    {form.watch("campaignContent.0.content") ? (
                      <div className="prose">
                        <div dangerouslySetInnerHTML={{ __html: rawhtml }} />
                      </div>
                    ) : (
                      "No content set"
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Launch Date</h3>
                    <p>
                      {form.watch("campaignContent.0.scheduledOn")
                        ? format(
                            new Date(
                              form.watch("campaignContent.0.scheduledOn")
                            ),
                            "d MMM, yyyy"
                          )
                        : "No date set"}
                    </p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
