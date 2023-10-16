import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Category } from 'entities/Category';
import { SortMethod } from 'entities/Sorting';
import { SearchBooksSchema } from '../types/searchScema.ts';
import { fetchBooksByOptions } from '../services/fetchBooksByOptions/fetchBooksByOptions.ts';

const initialState: SearchBooksSchema = {
	value: '',
	category: Category.ALL,
	sortMethod: SortMethod.NEWEST,
	isLoading: false,
	books: [],
	total: 0,
	hasMore: false,
	limit: 30,
	startIndex: 0,
	error: ''
};

const searchBooksSlice = createSlice({
	name: 'search',
	initialState,
	reducers: {
		setSearchValue: (state, action: PayloadAction<string>) => {
			state.value = action.payload;
		},
		setCategory: (state, action: PayloadAction<Category>) => {
			state.category = action.payload;
		},
		setSortBy: (state, action: PayloadAction<SortMethod>) => {
			state.sortMethod = action.payload;
		},
		setItems: (state, action) => {
			state.books  = action.payload;
		},
		setLimit: (state, action) => {
			state.limit = action.payload;
		},
		setStartIndex: (state, action) => {
			state.startIndex = action.payload;
		}

	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchBooksByOptions.pending, (state) => {
			state.isLoading = true;
		})
			.addCase(fetchBooksByOptions.fulfilled, (state, action) => {
				state.books = [...state.books, ...action.payload.items || []] ;
				state.total = action.payload.totalItems;
				state.isLoading = false;
				state.hasMore = state.books.length > 0 && state.total > state.limit;
			})

			.addCase(fetchBooksByOptions.rejected, (state)=>{
				state.isLoading = false;
				state.error = 'Failed request';
			});

	}
});

export const {
	actions: searchBooksActions,
	reducer: searchBooksReducer
} = searchBooksSlice;
