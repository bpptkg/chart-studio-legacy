<template>
  <v-treeview hoverable activatable :items="items" dense>
    <template v-slot:prepend="{ item }">
      <v-icon>
        {{ icons[item.type] }}
      </v-icon>
    </template>
  </v-treeview>
</template>

<script>
export default {
  data: () => ({
    icons: {
      chart: 'mdi-chart-box-outline',
      series: 'mdi-chart-line-variant',
      subplot: 'mdi-chart-line',
    },
    items: [
      {
        type: 'chart',
        name: 'Chart',
        children: [
          {
            id: 0,
            type: 'subplot',
            name: 'Subplot',
            children: [
              { id: 0, name: 'Seismicity', type: 'series' },
              { id: 1, name: 'EDM', type: 'series' },
              { id: 2, name: 'RSAM', type: 'series' },
            ],
          },
        ],
      },
    ],
  }),
};
</script>
