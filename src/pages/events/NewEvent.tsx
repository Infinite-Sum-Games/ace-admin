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
import { useState } from "react";
import EventMDXComponent from "@/components/EventComponents/EventMDXComponent";
import { EventmarkdownState } from "@/atoms/EventMarkDown";
import Sidebar from "@/components/Sidebar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { useRecoilState } from "recoil";
import { marked } from "marked";
import UploadThing from "@/EventFormComponents/UploadThing";
import {
  Tags,
  HeartHandshake,
  UsersRound,
  BadgeIndianRupee,
} from "lucide-react";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Save, MapPin } from "lucide-react";
const formSchema = z.object({
  title: z
    .string()
    .max(120, { message: "Title must be 120 characters or less." })
    .min(1, { message: "Title Cannot be Empty" }),
  blurb: z
    .string()
    .max(120, { message: "Blurb must be 120 characters or less." })
    .min(1, { message: "Blurb Cannot be Empty" }),
  content: z.string(),
  startTime: z.string().nonempty("Start time is required."),
  endTime: z.string().nonempty("End time is required."),
  launchDate: z.date({ required_error: "Launch date is required." }),
  tags: z.array(z.string()).optional(),
  venue: z.string(),
  datetime: z.date({ required_error: "Event date and time are required." }),
  sponsors: z.array(z.string()).optional(),
  guests: z.array(z.string()).min(1, { message: "Guests Cannot be Empty." }),
  paid: z.boolean(),
  amount: z
    .number()
    .min(0, { message: "Amount should be a positive number." })
    .optional(),
  posterURL: z.string().optional(),
  mode: z.enum(["Online", "Offline"], { required_error: "Mode is required." }),
  Cost: z.enum(["Paid", "Free"], { required_error: "Cost is required." }),
});

export default function Component() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      blurb: "",
      content: "",
      amount: undefined,
      tags: [],
      venue: "",
      datetime: undefined,
      sponsors: [],
      guests: [],
      posterURL: "",
      mode: "Online",
      Cost: "Paid",
    },
  });

  const [titleCount, setTitleCount] = useState("0/120");
  const [blurbCount, setBlurbCount] = useState("0/120");
  const [content] = useRecoilState(EventmarkdownState);
  const rawhtml = marked(content);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>();
  function onSubmit(values: z.infer<typeof formSchema>) {
    if (!values.launchDate) {
      alert("Launch date is required.");
      return;
    }

    if (values.mode === "Offline" && !values.venue) {
      alert("Venue is required if the mode is Offline.");
      return;
    }

    console.log(values);
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 p-6 flex justify-center items-center">
        <Card className="w-full max-w-5xl border-border border-2 rounded-lg">
          <CardHeader>
            <CardTitle className="text-6xl text-center font-bold">
              Create New Event
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
                    {/* Title Field */}
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-lg">Title</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Type className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                              <Input
                                placeholder="Event title"
                                className="pl-10 pr-16 mb-4"
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

                    {/* Blurb Field */}
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
                                className="pl-10 pr-16 mb-4"
                                {...field}
                                onChange={(e) => {
                                  field.onChange(e);
                                  setBlurbCount(`${e.target.value.length}/120`);
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

                    {/* Content Field */}
                    <FormField
                      control={form.control}
                      name="content"
                      render={() => (
                        <FormItem>
                          <FormLabel>Content</FormLabel>
                          <FormControl>
                            <EventMDXComponent />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Horizontal Input Fields for Tags, Sponsors, Guests, and Venue */}
                    <div className="flex space-x-4">
                      <FormField
                        control={form.control}
                        name="tags"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel>Tags</FormLabel>

                            <FormControl>
                              <div className="relative">
                                <Tags className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input
                                  placeholder="Event tags (comma-separated)"
                                  className="pl-10 pr-16 mb-4"
                                  value={field.value?.join(", ") ?? ""} // Provide default empty string // Join the array into a string for display
                                  onChange={(e) => {
                                    // Split the input string into an array
                                    const tagsArray: string[] = e.target.value
                                      .split(",")
                                      .map((item) => item.trim());
                                    field.onChange(tagsArray); // Update the field with the new array
                                  }}
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="sponsors"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel className="text-l">Sponsors</FormLabel>

                            <FormControl>
                              <div className="relative">
                                <HeartHandshake className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input
                                  className="pl-10 pr-16 mb-4"
                                  placeholder="Event sponsors (comma-separated)"
                                  value={field.value?.join(", ") ?? ""} // Provide default empty string // Join the array into a string for display
                                  onChange={(e) => {
                                    // Split the input string into an array
                                    const sponsorsArray: string[] =
                                      e.target.value
                                        .split(",")
                                        .map((item) => item.trim());
                                    field.onChange(sponsorsArray); // Update the field with the new array
                                  }}
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="flex space-x-4">
                      <FormField
                        control={form.control}
                        name="mode"
                        render={({ field }) => (
                          <FormItem className="flex-1 mb-4">
                            <FormLabel>Mode</FormLabel>
                            <FormControl>
                              <Select
                                onValueChange={(value) => field.onChange(value)}
                                value={field.value}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select mode" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="Online">Online</SelectItem>
                                  <SelectItem value="Offline">
                                    Offline
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="venue"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel>Venue</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input
                                  className="pl-10 pr-16 mb-4"
                                  placeholder="Event venue"
                                  {...field}
                                  disabled={form.watch("mode") === "Online"} // Disable if mode is "Online"
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="guests"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel>Guests</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <UsersRound className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                              <Input
                                className="pl-10 pr-16 mb-4"
                                placeholder="Event guests (comma-separated)"
                                value={field.value?.join(", ") ?? ""} // Provide default empty string// Join the array into a string for display
                                onChange={(e) => {
                                  // Split the input string into an array
                                  const guestsArray: string[] = e.target.value
                                    .split(",")
                                    .map((item) => item.trim());
                                  field.onChange(guestsArray); // Update the field with the new array
                                }}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="flex space-x-4">
                      <FormField
                        control={form.control}
                        name="Cost"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel>Cost</FormLabel>
                            <FormControl>
                              <Select
                                onValueChange={(value) => field.onChange(value)}
                                value={field.value}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select mode" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="Paid">Paid</SelectItem>
                                  <SelectItem value="Free">Free</SelectItem>
                                </SelectContent>
                              </Select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="amount"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel>Amount</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <BadgeIndianRupee className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input
                                  className="pl-10 pr-16 mb-4"
                                  placeholder="Amount"
                                  {...field}
                                  disabled={form.watch("Cost") === "Free"} // Disable if mode is "Online"
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                   
                    {/* Poster URL Field */}
                    <FormField
                      control={form.control}
                      name="posterURL"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Poster URL (10MB limit)</FormLabel>
                          <FormControl>
                            <UploadThing
                              file={field.value as string | undefined}
                              setFile={(file) => field.onChange(file)}
                              maxFileSize={10}
                              maxWidth={1000}   // max width in pixels
                              maxHeight={1500}
                              minWidth={600}
                              minHeight={900}  // max height in pixels
                              acceptedTypes={[
                                "image/jpeg",
                                "image/png",
                                "image/gif",
                              ]}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="flex items-center space-x-4">
                      <FormField
                        control={form.control}
                        name="startTime"
                        render={({ field }) => (
                          <FormItem className="flex-1 mb-4 mt-5">
                            <FormLabel className="text-m text-gray-100">
                              Start Time
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="time"
                                placeholder="Select start time"
                                {...field}
                                className={`
              flex h-12 w-full text-base text-white ring-offset-background
              file:border-0 file:bg-transparent file:text-base file:font-medium
              file:text-white placeholder:text-gray-100
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
              focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50
              bg-gray-900 border border-gray-700 rounded-lg px-4 py-2
              focus:ring-2 focus:ring-blue-400 focus:border-transparent
            `}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="endTime"
                        render={({ field }) => (
                          <FormItem className="flex-1 mt-5 mb-4">
                            <FormLabel className="text-m text-gray-100">
                              End Time
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="time"
                                placeholder="Select end time"
                                {...field}
                                className={`
              flex h-12 w-full text-base text-white ring-offset-background
              file:border-0 file:bg-transparent file:text-base file:font-medium
              file:text-white placeholder:text-gray-100
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
              focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50
              bg-gray-900 border border-gray-700 rounded-lg px-4 py-2
              focus:ring-2 focus:ring-blue-400 focus:border-transparent
            `}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Launch Date Field */}
                    <FormField
                      control={form.control}
                      name="launchDate"
                      render={({ field }) => (
                        <FormItem className="flex flex-col mb-4">
                          <FormLabel>Launch Date</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <div>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "w-[280px] pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  {field.value ? (
                                    format(field.value, "d MMM, yyyy")
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </div>
                            </PopoverTrigger>
                            <PopoverContent
                              className="w-auto p-0"
                              align="start"
                            >
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date) =>
                                  date < new Date() ||
                                  date < new Date("1900-01-01")
                                }
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          <FormDescription>
                            Choose the launch date for your Event.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Button Group */}
                    <div className="flex justify-end space-x-4 mt-6 col-span-2">
                      {/* Save as Draft Button */}
                      <Button
                        type="button" // Change to button type since it's not a form submission
                        className="flex items-center px-6 py-3 text-base font-semibold text-gray-700 bg-gray-300 rounded-md shadow-md hover:bg-gray-400 transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                      >
                        <Save className="mr-2 h-5 w-5" />{" "}
                        {/* Assuming you have a Save icon */}
                        Save as Draft
                      </Button>

                      {/* Submit Button */}
                      <Button
                        onClick={form.handleSubmit(onSubmit)}
                        type="submit"
                        className="flex items-center px-6 py-3 text-base font-semibold text-white bg-blue-600 rounded-md shadow-md hover:bg-blue-700 transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      >
                        <Send className="mr-2 h-5 w-5" />
                        Submit Event
                      </Button>
                    </div>
                  </form>
                </Form>
              </TabsContent>
              <TabsContent value="preview">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-lg">Title</h3>
                    <p>{form.watch("title") || "No title set"}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Blurb</h3>
                    <p>{form.watch("blurb") || "No blurb set"}</p>
                  </div>
                  <div className="col-span-2">
                    <h3 className="font-semibold text-xl mt-5">Content</h3>
                    <hr />
                    <div className="prose">
                      <div dangerouslySetInnerHTML={{ __html: rawhtml }} />
                    </div>
                    <hr />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Launch Date</h3>
                    <p>
                      {form.watch("launchDate")
                        ? format(form.watch("launchDate"), "d MMM, yyyy")
                        : "No date set"}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Venue</h3>
                    <p>{form.watch("venue") || "No venue set"}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Tags</h3>
                    <p>
                      {form.watch("tags")?.length
                        ? form
                            .watch("tags")!
                            .map((tag: string) => (
                              <span key={tag.trim()}>{tag.trim()}, </span>
                            ))
                        : "No tags set"}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Sponsors</h3>
                    <p>
                      {form.watch("sponsors")?.length
                        ? form
                            .watch("sponsors")!
                            .map((sponsor: string) => (
                              <span key={sponsor.trim()}>
                                {sponsor.trim()},{" "}
                              </span>
                            ))
                        : "No sponsors"}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Guests</h3>
                    <p>
                      {form.watch("guests") && form.watch("guests").length > 0
                        ? form
                            .watch("guests")
                            .toString()
                            .split(",")
                            .map((guest) => (
                              <span key={guest}>{guest.trim()}, </span>
                            ))
                        : "No guests"}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Mode</h3>
                    <p>{form.watch("mode")}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Cost</h3>
                    <p>{form.watch("Cost")}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Amount</h3>
                    <p>{form.watch("amount") || "No amount set"}</p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-lg">Start Time</h3>
                    <p>{form.watch("startTime") || "No start time set"}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">End Time</h3>
                    <p>{form.watch("endTime") || "No end time set"}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Poster</h3>
                    {form.watch("posterURL") ? (
                      <img
                        src={form.watch("posterURL")}
                        alt="Uploaded Poster"
                        className="w-48 h-auto rounded-md"
                      />
                    ) : (
                      <p>No poster uploaded</p>
                    )}
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
