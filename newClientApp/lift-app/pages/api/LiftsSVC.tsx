import axios from "axios";

export default class UsersSVC {
    public static uploadLift = async (currFloor:number, status:string, direction: string, floorLimit: number, url: string) => {
        axios.post(`${url}/Lifts`,{
            "CurrentFloor": currFloor,
            "Status": status,
            "Direction": direction,
            "FloorsItCanGoUpTo": floorLimit
         }).then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
    }
    public static putLift = async (currFloor:number, status:string, url: string, id: number, floorsItCanGoUpTo:number ) => {
      let newDir;
      if (status === "Going up") {
        newDir = "Up"
      }
      if (status === "Going down") {
        newDir = "Down"
      }
      else{
        newDir = "None"
      }
      axios.put(`${url}/Lifts/${id}`,{
          "CurrentFloor": currFloor,
          "Status": status,
          "Direction": newDir,
          "FloorsItCanGoUpTo": floorsItCanGoUpTo
       }).then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
  }
    public static fetchUrl = async (url:string) => {
        return fetch(url).then(r => r.json())
    }
    public static uploadLiftLog = async (currFloor:number, status:string, url: string) => {
      axios.post(`${url}/LiftLogs`,{
          "CurrentFloor": currFloor,
          "Status": status,
       }).then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
  }
}