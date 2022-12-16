import moment from "moment";
import { inject, injectable } from "tsyringe";

import { ISensorsRepository } from "../../repositories/ISensorsRepository";

const calculateVPD = ({ temperature, humidity }): number => {
  const svp = 610.7 * 10 ** ((7.5 * temperature) / (237.3 + temperature));
  const vpd = (((100 - humidity) / 100) * svp) / 1000;
  return +vpd.toFixed(2);
};
interface IRequest {
  initialDate: Date;
  endDate: Date;
}

interface IVpdAveragesHour {
  hour?: string;
  temperature?: {
    sum: number;
    average: number;
  };
  humidity?: {
    sum: number;
    average: number;
  };
  vpd?: {
    sum: number;
    average: number;
  };
  count?: number;
}
interface IVpdAverages {
  date: string;
  hours?: IVpdAveragesHour[];
}
@injectable()
class GetAverageDHT22ValuesPerRangeUseCase {
  constructor(
    @inject("SensorsRepository") private sensorsRepository: ISensorsRepository
  ) {}

  async execute({ initialDate, endDate }: IRequest): Promise<any> {
    const result = await this.sensorsRepository.listByRange({
      initialDate,
      endDate,
    });
    const vpdAverages: IVpdAverages[] = [];

    for (let i = 0; i < result.length; i += 1) {
      const dht22Value = result[i];
      const dateReceived = moment(dht22Value.date_received);

      const vpdAverageDateExists = vpdAverages.find(
        (vpd) => vpd.date === dateReceived.format("DD/MM/YYYY")
      );
      const vpd = calculateVPD(dht22Value);
      if (!vpdAverageDateExists) {
        const constructHours = (dht22Value) => {
          const hoursObject = [];
          const hour = moment(dht22Value.date_received).hour();

          for (let i = 0; i <= 23; i += 1) {
            if (hour === i) {
              hoursObject.push({
                hour: moment(dht22Value.date_received).format("HH:00"),
                temperature: {
                  sum: dht22Value.temperature,
                  average: dht22Value.temperature,
                },
                humidity: {
                  sum: dht22Value.humidity,
                  average: dht22Value.humidity,
                },
                vpd: {
                  sum: vpd,
                  average: vpd,
                },
                count: 1,
              });
            } else {
              hoursObject.push({
                hour: `${String(i).padStart(2, "0")}:00`,
                temperature: {
                  sum: null,
                  average: null,
                },
                humidity: {
                  sum: null,
                  average: null,
                },
                vpd: {
                  sum: null,
                  average: null,
                },
                count: null,
              });
            }
          }

          return hoursObject;
        };
        constructHours(dht22Value);
        vpdAverages.push({
          date: dateReceived.format("DD/MM/YYYY"),
          hours: constructHours(dht22Value),
        });
      } else {
        const hourAverageExists = vpdAverageDateExists.hours.find(
          (hour) => hour.hour === dateReceived.format("HH:00")
        );
        if (!hourAverageExists) {
          vpdAverageDateExists.hours.push({
            hour: dateReceived.format("HH:00"),
            temperature: {
              sum: dht22Value.temperature,
              average: dht22Value.temperature,
            },
            humidity: {
              sum: dht22Value.humidity,
              average: dht22Value.humidity,
            },
            vpd: {
              sum: vpd,
              average: vpd,
            },
            count: 1,
          });
        } else {
          hourAverageExists.count += 1;
          hourAverageExists.humidity.sum += dht22Value.humidity;
          hourAverageExists.humidity.average = +(
            hourAverageExists.humidity.sum / hourAverageExists.count
          ).toFixed(2);

          hourAverageExists.temperature.sum += dht22Value.temperature;
          hourAverageExists.temperature.average = +(
            hourAverageExists.temperature.sum / hourAverageExists.count
          ).toFixed(2);

          hourAverageExists.vpd.sum += vpd;
          hourAverageExists.vpd.average = +(
            hourAverageExists.vpd.sum / hourAverageExists.count
          ).toFixed(2);
        }
      }
    }

    return vpdAverages;
  }
}

export { GetAverageDHT22ValuesPerRangeUseCase };
