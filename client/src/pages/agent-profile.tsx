import { useOne } from '@pankod/refine-core';
import { useParams } from '@pankod/refine-react-router-v6';

import { Profile } from 'components';

const AgentProfile = () => {
  const { id } = useParams();

  const { data, isLoading, isError } = useOne({
    resource: 'users',
    id: id as string,
  });

  const agentProfile = data?.data ?? [];

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Something went wrong!</div>;
  }

  return (
    <Profile
      type="Agent"
      name={agentProfile?.name}
      avatar={agentProfile?.avatar}
      email={agentProfile?.email}
      properties={agentProfile?.allProperties}
    />
  );
};

export default AgentProfile;
