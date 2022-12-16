import moment from "moment";
import { inject, injectable } from "tsyringe";

import { ISensorsRepository } from "../../../sensors/repositories/ISensorsRepository";
import { ILoadChartDTO } from "../../dtos/ILoadChartDTO";
import { IChartRepository } from "../../repositories/IChartRepository";

const transformToChartData = (data, variable) => {
  const chartData = [];

  for (let i = 0; i < data.length; i += 1) {
    const value = data[i];
    const dateReceived = moment(value.date_received);

    const dateExistsOnChartData = chartData.find(
      (vpd) => vpd.date === dateReceived.format("DD/MM/YYYY")
    );

    if (!dateExistsOnChartData) {
      const constructHours = (dht22Value) => {
        const hoursObject = [];
        const hour = moment(dht22Value.date_received).hour();

        for (let i = 0; i <= 23; i += 1) {
          if (hour === i) {
            const hourObject = {
              hour: moment(dht22Value.date_received).format("HH:00"),
            };
            hourObject[variable] = {
              sum: dht22Value[variable],
              average: dht22Value[variable],
              count: 1,
            };

            hoursObject.push(hourObject);
          } else {
            const hourObject = {
              hour: `${String(i).padStart(2, "0")}:00`,
            };
            hourObject[variable] = {
              sum: null,
              average: null,
              count: null,
            };
            hoursObject.push(hourObject);
          }
        }

        return hoursObject;
      };

      chartData.push({
        date: dateReceived.format("DD/MM/YYYY"),
        hours: constructHours(value),
      });
    } else {
      const hourAverageExists = dateExistsOnChartData.hours.find((item) => {
        return item.hour === dateReceived.format("HH:00");
      });

      if (!hourAverageExists) {
        const object = {
          hour: dateReceived.format("HH:00"),
        };

        object[variable] = {
          sum: value[variable],
          average: value[variable],
          count: 1,
        };

        dateExistsOnChartData.hours.push(object);
      } else {
        hourAverageExists[variable].count += 1;
        hourAverageExists[variable].sum += value[variable];
        hourAverageExists[variable].average = +(
          hourAverageExists[variable].sum / hourAverageExists[variable].count
        ).toFixed(2);
      }
    }
  }
  return chartData;
};

@injectable()
class LoadChartUseCase {
  constructor(
    @inject("ChartRepository")
    private chartRepository: IChartRepository,
    @inject("SensorsRepository")
    private sensorsRepository: ISensorsRepository
  ) {}

  async execute({
    chartId,
    endDate,
    initialDate,
  }: ILoadChartDTO): Promise<any> {
    const chart = await this.chartRepository.findById(chartId);
    if (!chart) {
      throw new Error("Chart not found");
    }

    if (chart.variable !== "temperature" && chart.variable !== "humidity") {
      throw new Error("Variable not found");
    }

    if (chart.source === "variable") {
      let values = null;

      const chartData = {
        ...chart,
      };

      if (chart.type === "table") {
        values = await this.sensorsRepository.listByRange({
          initialDate,
          endDate,
        });
        const transformedValues = transformToChartData(values, chart.variable);
        Object.assign(chartData, { data: transformedValues });
        return chartData;
      }

      const diffTime = Math.abs(+endDate - +initialDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      let flagToCallAnotherFunction = false;
      if (diffDays > 1) {
        flagToCallAnotherFunction = true;
      }
      if (chart.variable === "temperature") {
        let temperatureValues = null;
        if (flagToCallAnotherFunction) {
          values = await this.sensorsRepository.listAverageOnRange({
            initialDate,
            endDate,
          });

          temperatureValues = values.dataTemp.data.map((value: any) => {
            return {
              x: value._id,
              y: value.avg.toFixed(2),
            };
          });
        } else {
          values = await this.sensorsRepository.listAveragePerHour({
            initialDate,
            endDate,
          });

          temperatureValues = values.map((value: any) => {
            return {
              x: value._id,
              y: value.avg_temperature.toFixed(2),
            };
          });
        }

        Object.assign(chartData, { data: temperatureValues });
      }

      if (chart.variable === "humidity") {
        let humidityValues = null;
        if (flagToCallAnotherFunction) {
          values = await this.sensorsRepository.listAverageOnRange({
            initialDate,
            endDate,
          });
          humidityValues = values.dataHum.data.map((value: any) => {
            return {
              x: value._id,
              y: value.avg.toFixed(2),
            };
          });
        } else {
          values = await this.sensorsRepository.listAveragePerHour({
            initialDate,
            endDate,
          });
          humidityValues = values.map((value: any) => {
            return {
              x: value._id,
              y: value.avg_humidity.toFixed(2),
            };
          });
        }

        Object.assign(chartData, { data: humidityValues });
      }

      return chartData;
    }
  }
}

export { LoadChartUseCase };
