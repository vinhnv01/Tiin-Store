import axios from "axios";
import { AppConfig, AppConfigAddress } from "../AppConfig";

export const request = axios.create({
  baseURL: AppConfig.apiUrl,
});

export const requestAdress = axios.create({
  baseURL: AppConfigAddress.apiUrl,
});
