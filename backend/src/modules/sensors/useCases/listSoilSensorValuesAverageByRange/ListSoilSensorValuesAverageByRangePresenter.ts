import moment from "moment";

import { SoilSensor } from "../../entities/SoilSensor";

class ListSoilSensorValuesAverageByRangePresenter {
  public transform(response: SoilSensor[]): any {
    const mappedResponse = [];
    const hash = {};
    for (let i = 0; i < response.length; i += 1) {
      const dateFormated = moment(response[i].dateReceived).format(
        "DD/MM/YYYY"
      );
      if (hash[dateFormated] === undefined) {
        hash[dateFormated] = {
          date: dateFormated,
          plants: [],
        };
      }

      const plant = hash[dateFormated].plants.find(
        (p) => p.plantId === response[i].plantId
      );

      if (plant === undefined) {
        hash[dateFormated].plants.push({
          plantId: response[i].plantId,
          sum: response[i].soilHumidity,
          count: 1,
          average: response[i].soilHumidity,
        });
      } else {
        plant.sum += response[i].soilHumidity;
        plant.count += 1;
        plant.average = (plant.sum / plant.count).toFixed(2);
      }
    }

    const orderedDates = {};
    const hashOrderedAsc = Object.keys(hash)
      .sort(function (a, b) {
        return (
          +moment(a, "DD/MM/YYYY").toDate() - +moment(b, "DD/MM/YYYY").toDate()
        );
      })
      .forEach(function (key) {
        orderedDates[key] = hash[key];
      });
    return orderedDates;
  }
}

export { ListSoilSensorValuesAverageByRangePresenter };
