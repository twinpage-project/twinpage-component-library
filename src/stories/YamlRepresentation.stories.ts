import type { Meta, StoryObj } from '@storybook/react';

import { YamlRepresentation } from '../components';

const meta: Meta<typeof YamlRepresentation> = {
  component: YamlRepresentation,
};

export default meta;

type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    primary: true,
    label: 'YamlRepresentation',
  },
};