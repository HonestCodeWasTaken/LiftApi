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
    public static fetchUrl = async (url:string) => {
        return fetch(url).then(r => r.json())
    }
}