import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { t } from "i18next";
import {
  Button,
  FormField,
  Form,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  toast,
} from "@renderer/components/ui";
import { AISettingsProviderContext } from "@renderer/context";
import { useContext, useState } from "react";

export const AzureSettings = () => {
  const { azure, setAzure } = useContext(AISettingsProviderContext);
  const [editing, setEditing] = useState(false);

  const azureConfigSchema = z.object({
    key: z.string().optional(),
    region: z.enum([
      "eastus",
      "eastus2",
      "southcentralus",
      "westus2",
      "westus3",
      "australiaeast",
      "southeastasia",
      "northeurope",
      "swedencentral",
      "uksouth",
      "westeurope",
      "centralus",
      "southafricanorth",
      "centralindia",
      "eastasia",
      "japaneast",
      "koreacentral"
    ]).optional(),
  });

  const form = useForm<z.infer<typeof azureConfigSchema>>({
    resolver: zodResolver(azureConfigSchema),
    values: {
      key: azure?.key,
      region: azure?.region,
    },
  });

  const onSubmit = async (data: z.infer<typeof azureConfigSchema>) => {
    setAzure({
      ...data,
    });
    setEditing(false);
    toast.success(t("azureConfigSaved"));
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex items-start justify-between py-4">
          <div className="">
            <div className="mb-2">Azure</div>
            <div className="text-sm text-muted-foreground space-y-3">
              <FormField
                control={form.control}
                name="key"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center space-x-2">
                      <FormLabel className="min-w-max">{t("key")}:</FormLabel>
                      <Input
                        disabled={!editing}
                        type="password"
                        placeholder=""
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="region"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center space-x-2">
                      <FormLabel className="min-w-max">{t("region")}:</FormLabel>
                      <Input
                        disabled={!editing}
                        placeholder={t("leaveEmptyToUseDefault")}
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant={editing ? "outline" : "secondary"}
              size="sm"
              type="reset"
              onClick={(event) => {
                event.preventDefault();
                form.reset();
                setEditing(!editing);
              }}
            >
              {editing ? t("cancel") : t("edit")}
            </Button>
            <Button className={editing ? "" : "hidden"} size="sm" type="submit">
              {t("save")}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};