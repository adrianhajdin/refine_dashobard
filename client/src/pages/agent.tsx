import { useList } from '@pankod/refine-core';
import { Box, Typography } from '@pankod/refine-mui';

import { AgentCard } from 'components';

const Agents = () => {
  const { data, isLoading, isError } = useList({
    resource: 'users',
  });

  const allAgents = data?.data ?? [];

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Something went wrong!</div>;
  }

  return (
    <Box>
      <Typography fontSize={25} fontWeight={700} color="#11142D">Agents List</Typography>

      <Box
        mt="20px"
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '20px',
          backgroundColor: '#FCFCFC' }}
      >
        {allAgents.length > 0
        && allAgents?.map((agent) => (
          <AgentCard
            key={agent._id}
            id={agent._id}
            name={agent.name}
            email={agent.email}
            avatar={agent.avatar}
            noOfProperties={agent.allProperties.length}
          />
        ))}
      </Box>
    </Box>
  );
};

export default Agents;
