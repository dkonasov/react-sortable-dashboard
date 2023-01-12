import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Dashboard } from "../components/dasboard/dashboard";
import { DashboardWidget } from "../components/widget/dashboard-widget";

export default {
  title: "Dashboard",
  component: Dashboard,
} as ComponentMeta<typeof Dashboard>;

const Template: ComponentStory<typeof Dashboard> = (args) => (
  <Dashboard rows={1} columns={1}>
    <DashboardWidget rows={1} columns={1}>
      Test widget
    </DashboardWidget>
  </Dashboard>
);

export const Default = Template.bind({});
Default.args = {};
