import axios from "axios";
import {userStore} from "../stores/user.js";
import {push} from "svelte-spa-router";

export class PlaceMarkService {
    placeMarkUrl = ""

    constructor(placeMarkUrl) {
        this.placeMarkUrl = placeMarkUrl;
        const userCredentials = localStorage.currentUser;
        if (userCredentials) {
            const savedUser = JSON.parse(userCredentials);
            userStore.set({
                firstName: savedUser.firstName,
                lastName: savedUser.lastName,
                email: savedUser.email,
                _id: savedUser._id,
                token: savedUser.token,

            });
            axios.defaults.headers.common["Authorization"] = "Bearer " + savedUser.token;
        }
    }

    async authenticate(user) {
        try {
            const response = await axios.post(`${this.placeMarkUrl}/api/users/authenticate`, user);
            console.log(response)
            // eslint-disable-next-line dot-notation
            axios.defaults.headers.common["Authorization"] = `Bearer ${response.data.token}`;
            if (response.data.success) {
                const userDetails = await axios.post(`${this.placeMarkUrl}/api/users/find`, {email: user.email});
                userStore.set({
                    firstName: userDetails.data.firstName,
                    lastName: userDetails.data.lastName,
                    email: userDetails.data.email,
                    _id: userDetails.data._id,
                    token: response.data.token,
                });
                localStorage.currentUser = JSON.stringify({
                    firstName: userDetails.data.firstName,
                    lastName: userDetails.data.lastName,
                    email: userDetails.data.email,
                    _id: userDetails.data._id,
                    token: response.data.token,
                });
                return true;
            }
            return false;
        } catch (error) {
            return false;
        }
    }

    async logout() {
        // eslint-disable-next-line dot-notation
        console.log(userStore);
        const res = await axios.post(`${this.placeMarkUrl}/api/revokeToken`,);
        axios.defaults.headers.common["Authorization"] = "";
        userStore.set({
            firstName: "",
            lastName: "",
            email: "",
            _id: "",
            token: "",
        });
        localStorage.removeItem("currentUser");
        return "Logged Out."
    }

    async createUser(user) {
        const res = await axios.post(`${this.placeMarkUrl}/api/users`, user);
        return res.data;
    }

    async getUser(id) {
        const res = await axios.get(`${this.placeMarkUrl}/api/users/${id}`);
        return res.data;
    }

    async getUserByEmail(email) {
        const res = await axios.post(`${this.placeMarkUrl}/api/users/find`, {email: email});
        return res.data;
    }

    async getAllUsers() {
        const res = await axios.get(`${this.placeMarkUrl}/api/users`);
        return res.data;
    }

    async deleteAllUsers() {
        const res = await axios.delete(`${this.placeMarkUrl}/api/users`);
        return res.data;
    }

    async createPlace(place) {
        const res = await axios.post(`${this.placeMarkUrl}/api/placemark`, place);
        return res.data;
    }

    async updatePlace(place) {
        const res = await axios.post(`${this.placeMarkUrl}/api/placemark/${place._id}`, place);
        return res.data;
    }

    async deleteAllPlaces() {
        const response = await axios.delete(`${this.placeMarkUrl}/api/placemark`);
        return response.data;
    }

    async deletePlace(id) {
        const response = await axios.delete(`${this.placeMarkUrl}/api/placemark/${id}`);
        return response;
    }

    async getAllPlaces() {
        const res = await axios.get(`${this.placeMarkUrl}/api/placemark`);
        return res.data;
    }

    async getPlace(id) {
        const res = await axios.get(`${this.placeMarkUrl}/api/placemark/${id}`);
        return res.data;
    }

    async createCategory(category) {
        const res = await axios.post(`${this.placeMarkUrl}/api/placemark/category`, category);
        return res.data;
    }

    async deleteAllCategories() {
        const response = await axios.delete(`${this.placeMarkUrl}/api/placemark/category`);
        return response.data;
    }

    async deleteCategory(id) {
        const response = await axios.delete(`${this.placeMarkUrl}/api/placemark/category/${id}`);
        return response;
    }

    async deletePlaceFromCategory(placeId, categoryId) {
        const response = await axios.delete(`${this.placeMarkUrl}/api/placemark/category/${categoryId}/places/${placeId}`);
        return response;
    }

    async getAllCategories() {
        const res = await axios.get(`${this.placeMarkUrl}/api/placemark/category`);
        return res.data;
    }

    async getCategory(id) {
        const res = await axios.get(`${this.placeMarkUrl}/api/placemark/category/${id}`);
        return res.data;
    }

    async getPlacesInCategory(id) {
        const res = await axios.get(`${this.placeMarkUrl}/api/placemark/category/${id}/places`);
        return res.data;
    }

    async addPlaceToCategory(placeId, categoryId) {
        const res = await axios.post(`${this.placeMarkUrl}/api/placemark/category/${categoryId}/places`, {placeId: placeId});
        return res.data;
    }

    async uploadImage(options) {
        const res = await axios.post(`${this.placeMarkUrl}/api/place/uploadimage`, options);
        return res.data;
    }

    async deleteImage(id) {
        const res = await axios.delete(`${this.placeMarkUrl}/api/place/deleteimage/${id}`);
        return res.data;
    }

    async checkToken() {
        const res = await axios.get(`${this.placeMarkUrl}/api/checkToken`);
        if (res.data.statusCode == 401) {
            return false;
        };
        return true;
    }


};
