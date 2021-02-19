import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  createStyles,
  makeStyles,
  Theme,
} from "@material-ui/core";
import { RootState } from "app/rootReducer";
import { useAppDispatch } from "app/store";
import { addBookToBookshelf } from "features/bookshelf";
import { ItemsEntity } from "interfaces/bookSearchResponse.interface";
import React from "react";
import { shallowEqual, useSelector } from "react-redux";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 160,
    },
  })
);

interface Props {
  book: ItemsEntity;
}

const AddToBookshelfSelector = ({ book }: Props) => {
  const classes = useStyles();

  const dispatch = useAppDispatch();

  const { bookshelfChoices } = useSelector((state: RootState) => {
    return {
      bookshelfChoices: state.bookshelf.currentUsersBookshelves.map(
        (bookshelf) => bookshelf.bookshelfName
      ),
    };
  }, shallowEqual);

  const [bookshelf, setBookshelf] = React.useState("");

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setBookshelf(event.target.value as string);

    const bookshelfName = event.target.value as string;

    dispatch(addBookToBookshelf({ bookshelfName, book }));
  };

  return (
    <FormControl className={classes.formControl}>
      <InputLabel id="add-to-bookshelf-label">Add To Bookshelf</InputLabel>
      <Select
        labelId="add-to-bookshelf-label"
        id="add-to-bookshelf-select"
        value={bookshelf}
        onChange={handleChange}
      >
        {bookshelfChoices.map((choice) => (
          <MenuItem key={choice} value={choice}>
            {choice}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default AddToBookshelfSelector;
