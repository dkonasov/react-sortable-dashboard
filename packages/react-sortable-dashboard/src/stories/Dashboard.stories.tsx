import React from "react";
import { ComponentStory, ComponentMeta, Story } from "@storybook/react";

import { Dashboard } from "../components/dasboard/dashboard";
import { DashboardWidget } from "../components/widget/dashboard-widget";

export default {
  title: "Dashboard",
  component: Dashboard,
} as ComponentMeta<typeof Dashboard>;

interface StoryArgs {
  columns: number;
  rows: number;
  widgets: number[];
}

const Template: Story<StoryArgs> = (args) => {
  return (
    <Dashboard rows={args.rows} columns={args.columns}>
      {args.widgets.map((widget, index) => (
        <DashboardWidget rows={widget[1]} columns={widget[0]} key={index}>
          Test widget
        </DashboardWidget>
      ))}
    </Dashboard>
  );
};

export const Default = Template.bind({});
Default.args = {
  columns: 1,
  rows: 1,
  widgets: [[1, 1]],
};
