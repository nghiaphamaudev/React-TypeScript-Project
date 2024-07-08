import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';

type TextRatingProp = {
  value: number | undefined;
};

export default function TextRating({ value }: TextRatingProp) {
  return (
    <Rating
      name="text-feedback"
      value={value === undefined ? 0 : value}
      readOnly
      sx={{ fontSize: 20 }}
      precision={0.1}
      emptyIcon={<StarIcon sx={{ fontSize: 20 }} />}
    />
  );
}
