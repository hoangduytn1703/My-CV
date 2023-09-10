import { storeToRefs } from "pinia";
import * as store from "../../core/store";
import { useRouter, useRoute } from "vue-router";
interface paramsDispatch {
  func: string;
  path?: string;
}
interface functionType {
  storeDispatch: (params: paramsDispatch, payload?: any) => Promise<void>;
  storeGetters: (params: paramsDispatch) => any;
  routePushName: (nameText: string, data?: any, newTab?: boolean) => void;
  routePushPath: (pathText: string, data?: any, newTab?: boolean) => void;
  getRoute: (key: string) => any;
}
export default (defaultNameStore: string): functionType => {
  const piniaStore = (path?: string) => {
    const { [path ? path : defaultNameStore]: pinia }: any = store;
    return pinia;
  };
  const storeDispatch = (
    { path, func }: paramsDispatch,
    payload?: any
  ): any => {
    const pinia = piniaStore(path);
    const { [func]: tempAction } = pinia();
    return payload ? tempAction(payload) : tempAction();
  };
  const storeGetters = ({ func, path }: paramsDispatch): any => {
    const pinia = piniaStore(path);
    const { [func]: tempGet } = storeToRefs(pinia());
    return tempGet;
  };
  /* Start router */
  const router = useRouter();
  const routePushName = (
    nameText: string,
    data?: any,
    newTab = false
  ): void => {
    const config = {
      ...(nameText && { name: nameText }),
      ...data,
    };
    if (!newTab) {
      router.push(config);
      window.scrollTo(0, 0);
    } else {
      const newRoute = router.resolve(config);
      window.open(newRoute.href);
    }
  };
  const routePushPath = (
    pathText?: string,
    data?: any,
    newTab = false
  ): void => {
    const config = {
      ...(pathText && { path: pathText }),
      ...data,
    };
    if (!newTab) router.push(config);
    else {
      const newRoute = router.resolve(config);
      window.open(newRoute.href);
    }
  };
  // route;
  const route = useRoute();
  const getRoute = (key: string) => {
    const data: any = {
      ["query"]: route?.query,
      ["params"]: route?.params,
      ["path"]: route?.path,
      ["fullPath"]: route?.fullPath,
      ["name"]: route?.name,
    };
    return data[key];
  };

  /* End router */

  return {
    storeDispatch,
    storeGetters,
    routePushName,
    routePushPath,
    getRoute,
  };
};
