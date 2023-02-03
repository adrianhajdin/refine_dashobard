import { Box, Stack, Typography } from '@pankod/refine-mui';

import { propertyReferralsInfo } from 'constants/index';

interface ProgressBarProp {
  title: string,
  percentage: number,
  color: string,
}

const ProgressBar = ({ title, percentage, color }: ProgressBarProp) => (
  <Box width="100%">
    <Stack direction="row" alignItems="center" justifyContent="space-between">
      <Typography fontSize={16} fontWeight={500} color="#11142D">{title}</Typography>
      <Typography fontSize={16} fontWeight={500} color="#11142D">{percentage}%</Typography>
    </Stack>
    <Box mt={2} position="relative" width="100%" height="8px" borderRadius={1} bgcolor="#E4E8EF">
      <Box
        width={`${percentage}%`}
        bgcolor={color}
        position="absolute"
        height="100%"
        borderRadius={1}
      />
    </Box>
  </Box>
);

const PropertyReferrals = () => (
  <Box
    p={4}
    id="chart"
    minWidth={490}
    bgcolor="#FCFCFC"
    display="flex"
    borderRadius="15px"
    flexDirection="column"
  >
    <Typography fontSize={18} fontWeight={600} color="#11142D">Property Referrals</Typography>

    <Stack my="20px" direction="column" gap={4}>
      {propertyReferralsInfo.map((bar) => <ProgressBar key={bar.title} {...bar} />)}
    </Stack>
  </Box>
);

export default PropertyReferrals;
