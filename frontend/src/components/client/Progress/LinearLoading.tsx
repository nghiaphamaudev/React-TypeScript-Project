import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
type LinearLoadingProp = {
  isShow: boolean;
};
export default function LinearLoading({ isShow }: LinearLoadingProp) {
  return (
    <>
      {isShow && (
        <Box sx={{ width: '100%' }}>
          <LinearProgress />
        </Box>
      )}
    </>
  );
}
