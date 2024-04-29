import axios from "axios";

function getInstance() {
    return axios.create({
        baseURL: "http://localhost:9999",
        // timeout: 100000 | timeout,
        headers: {
            "Content-type": "application/json"
        }
    });
}

const axiosInstance = getInstance();

const axiosGet = async (url, param ) => {
    const resp = await axiosInstance.get(url, { params: param });
    return resp;
};

const axiosPost = async (url, param, data) => {
    const resp = await axiosInstance.post(url, data, { params: param });
    return resp;
}

const axiosPut = async (url, param, data) => {
    const resp = await axiosInstance.put(url, data, { params: param });
    return resp;
}

const axiosDelete = async (url, param) => {
    const resp = await axiosInstance.delete(url, { params: param });
    return resp;
}

const axiosPatch = async (url, param, data) => {
    const resp = await axiosInstance.patch(url, data, { params: param });
    return resp;
}

export { axiosInstance, axiosGet, axiosPost, axiosPut, axiosDelete, axiosPatch };