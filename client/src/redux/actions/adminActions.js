import axios from "axios";
import { setProducts, setProductUpdateFlag, setReviewRemovalFlag } from "../slices/product";
import {
	setDeliveredFlag,
	setError,
	setLoading,
	resetError,
	getOrders,
	getUsers,
	userDelete,
	orderDelete,
} from "../slices/admin";

export const getAllUsers = () => async (dispatch, getState) => {
	setLoading();

	const {
		user: { userInfo },
	} = getState();

	const config = { headers: { Authorization: `Bearer ${userInfo.token}`, "Content-Type": "application/json" } };

	try {
		const { data } = await axios.get("api/users", config);
		dispatch(getUsers(data));
	} catch (error) {
		setError(
			error.response && error.response.data.message
				? error.response.data.message
				: error.message
				? error.message
				: "An expected error has ocured. Please try again later"
		);
	}
};

export const deleteUser = (id) => async (dispatch, getState) => {
	setLoading();

	const {
		user: { userInfo },
	} = getState();

	const config = { headers: { Authorization: `Bearer ${userInfo.token}`, "Content-Type": "application/json" } };

	try {
		const { data } = await axios.delete(`api/users/${id}`, config);
		dispatch(userDelete(data));
	} catch (error) {
		setError(
			error.response && error.response.data.message
				? error.response.data.message
				: error.message
				? error.message
				: "An expected error has ocured. Please try again later"
		);
	}
};

export const getAllOrders = () => async (dispatch, getState) => {
	dispatch(setLoading(true));
	const {
		user: { userInfo },
	} = getState();

	try {
		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
				'Content-Type': 'application/json',
			},
		};
		const { data } = await axios.get('api/orders', config);
		dispatch(getOrders(data));
	} catch (error) {
		dispatch(
			setError(
				error.response && error.response.data.message
					? error.response.data.message
					: error.message
					? error.message
					: 'Orders could not be fetched.'
			)
		);
	}
};

export const deleteOrder = (id) => async (dispatch, getState) => {
	const {
		user: { userInfo },
	} = getState();

	try {
		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
				'Content-Type': 'application/json',
			},
		};
		const { data } = await axios.delete(`api/orders/${id}`, config);
		dispatch(orderDelete(data));
	} catch (error) {
		dispatch(
			setError(
				error.response && error.response.data.message
					? error.response.data.message
					: error.message
					? error.message
					: 'Order could not be removed.'
			)
		);
	}
};

export const setDelivered = (id) => async (dispatch, getState) => {
	setLoading();

	const {
		user: { userInfo },
	} = getState();

	const config = { headers: { Authorization: `Bearer ${userInfo.token}`, "Content-Type": "application/json" } };

	try {
		await axios.put(`api/orders/${id}`, {}, config);
		dispatch(setDeliveredFlag());
	} catch (error) {
		setError(
			error.response && error.response.data.message
				? error.response.data.message
				: error.message
				? error.message
				: "An expected error has ocured. Please try again later"
		);
	}
};

export const resetErrorAndRemoval = () => async (disptach) => {
	disptach(resetError());
};

export const updateProduct =
	(brand, name, category, stock, price, id, productIsNew, description, subtitle, stripeId, imageOne, imageTwo ) => async (dispatch, getState) => {
		setLoading();

		const {
			user: { userInfo },
		} = getState();

		const config = { headers: { Authorization: `Bearer ${userInfo.token}`, "Content-Type": "application/json" } };

		try {
			const { data } = await axios.put(
				"api/products",
				{ brand, name, category, stock, price, id, productIsNew, description, subtitle, stripeId, imageOne, imageTwo },
				config
			);
			dispatch(setProducts(data));
			dispatch(setProductUpdateFlag());
		} catch (error) {
			setError(
				error.response && error.response.data.message
					? error.response.data.message
					: error.message
					? error.message
					: "An expected error has ocured. Please try again later"
			);
		}
	};

export const deleteProduct = (id) => async (dispatch, getState) => {
	setLoading();

	const {
		user: { userInfo },
	} = getState();

	const config = { headers: { Authorization: `Bearer ${userInfo.token}`, "Content-Type": "application/json" } };

	try {
		const { data } = await axios.delete(`api/products/${id}`, config);
		dispatch(setProducts(data));
		dispatch(setProductUpdateFlag());
        dispatch(resetError());
	} catch (error) {
		setError(
			error.response && error.response.data.message
				? error.response.data.message
				: error.message
				? error.message
				: "An expected error has ocured. Please try again later"
		);
	}
};

export const uploadProduct = (newProduct) => async (dispatch, getState) => {
	setLoading();

	const {
		user: { userInfo },
	} = getState();

	const config = { headers: { Authorization: `Bearer ${userInfo.token}`, "Content-Type": "application/json" } };

	try {
		const { data } = await axios.post(`api/products/`, newProduct, config);
		dispatch(setProducts(data));
		dispatch(setProductUpdateFlag());

	} catch (error) {
		setError(
			error.response && error.response.data.message
				? error.response.data.message
				: error.message
				? error.message
				: "An expected error has ocured. Please try again later"
		);
	}
};

export const removeReview = (productId, reviewId) => async (dispatch, getState) => {
	setLoading();

	const {
		user: { userInfo },
	} = getState();

	const config = { headers: { Authorization: `Bearer ${userInfo.token}`, "Content-Type": "application/json" } };

	try {
		const { data } = await axios.put(`api/products/${productId}/${reviewId}`, {}, config);
		dispatch(setProducts(data));
		dispatch(setReviewRemovalFlag());

	} catch (error) {
		setError(
			error.response && error.response.data.message
				? error.response.data.message
				: error.message
				? error.message
				: "An expected error has ocured. Please try again later"
		);
	}
};

