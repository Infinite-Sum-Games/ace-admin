import { useParams, useNavigate } from 'react-router-dom';
import { Form } from '@/components/ui/form';
import { tempData } from './CampaignEditions';
import { Status } from '@/components/NewsletterComponents/Columns';
import MDXComponent from '@/components/NewsletterComponents/MDXComponent';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from '@/components/ui/form';
import { cn } from '@/lib/utils';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Sidebar, CalendarIcon, Send } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { marked } from 'marked';

export interface CampaignContent {
  id: number;
  content: string;
  status: Status;
  scheduledOn: Date;
}
interface EditionContent {
  content: string;
  scheduledOn: string;
}
const EditCampaignContent = () => {
  const { contentID } = useParams<{ contentID: string }>() || { contentID: '' };
  const navigate = useNavigate();

  const campaign = tempData;
  const campaignContentToEdit = campaign.campaignContent.find((c) => c.id === parseInt(contentID || '0'));
  const [contentToEdit, setContentToEdit] = useState<string>(campaignContentToEdit?.content || "");
  const [scheduledOn, setScheduledOn] = useState<Date | undefined>(campaignContentToEdit?.scheduledOn);

  const form = useForm({
    defaultValues: {
      campaignContent: [
        {
          content: campaignContentToEdit?.content,
          scheduledOn: campaignContentToEdit?.scheduledOn,
        },
      ],
    },
  });

  const onSubmit = (data: EditionContent) => {
    // save the changes to the specific campaign content of temp data
    navigate(-1);
  };

  const rawhtml = marked(contentToEdit);

  return (
<div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 p-6 flex justify-center items-center">
        <Card className="w-full max-w-5xl border-border border-2 rounded-lg">
          <CardHeader>
            <CardTitle className="text-6xl text-center font-bold pb-4">
              Edit Campaign Content
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
                    {/* Single Content Entry */}
                    <FormField
                      control={form.control}
                      name="campaignContent.0.content"
                      render={({ field }) => {

                        return (
                          <FormItem>
                            <FormLabel>Content</FormLabel>
                            <FormControl>
                              <MDXComponent content={contentToEdit} setContent={setContentToEdit}
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
                      <Button variant={'secondary'} className='w-[50%]'>
                      Discard Changes
                      </Button>
                      <Button type="submit" className='w-[50%]'>
                        <Send className="mr-2 h-4 w-4" /> Submit Campaign
                      </Button>
                    </div>
                  </form>
                </Form>
              </TabsContent>
              <TabsContent value="preview">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-lg">Content</h3>
                    {form.watch("campaignContent.0.content") ? (
                      <div className="prose py-2">
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
                              form.watch("campaignContent.0.scheduledOn") || new Date()
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
};

export default EditCampaignContent;