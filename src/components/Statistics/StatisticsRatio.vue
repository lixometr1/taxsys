<template>
  <statistics-item class="statistics-travels h-100">
    <template #header>
      <div class="statistics-item__title">Соотношение</div>
    </template>
    <template>
      <apexchart
        width="100%"
        height="350"
        type="donut"
        :options="chartOptions"
        :series="series"
      ></apexchart>
    </template>
  </statistics-item>
</template>

<script lang="ts">
import StatisticsItem from "./StatisticsItem.vue";
import { Component, Prop, Vue } from "vue-property-decorator";
import { StatisticsEntity } from "@/models/statistics.entity";

@Component({
  setup() {
    const chartOptions = {
      chart: {
        type: "donut",
      },
      plotOptions: {
        pie: {
          customScale: 1,
          donut: {
            size: "75%",
            labels: {
              show: true,
              name: {
                show: true,
              },
              value: {
                show: true,
              },
            },
          },
        },
      },

      dataLabels: {
        enabled: false,
      },

      legend: {
        show: true,
        position: "bottom",
        fontSize: "16px",
        fontFamily: "Montserrat",
        formatter: function (seriesName, opts) {
          const seriesSum = opts.w.globals.series[opts.seriesIndex];
          return `<div class="statistics-item__legend">
            ${seriesName} - <b>${seriesSum} ₽</b>
          </div>`;
        },
        itemMargin: {
          horizontal: 20,
          vertical: 0,
        },
      },
      colors: ["#45117B", "#FFB801", "#F44879"],
      fill: {
        opacity: 1,
      },
      tooltip: {
        enabled: true,
        custom: function ({ series, seriesIndex, dataPointIndex, w }) {
          return (
            '<div class="statistics-item__tooltip">' +
            "<span>" +
            series[seriesIndex] +
            "</span>" +
            "</div>"
          );
        },
      },
      labels: ["Безналичные", "Наличные"],
    };

    return {
      chartOptions,
    };
  },
  components: { StatisticsItem },
})
export default class StatisticsTravels extends Vue {
  @Prop({ type: Object, default: () => ({}) }) value: StatisticsEntity;
  get series() {
    return [this.value.trips?.total_cashless, this.value.trips?.total_cash];
  }
  get ratioValue() {
    return this.value.trips;
  }
}
</script>

<style lang="scss">
.statistics-travels {
}
</style>