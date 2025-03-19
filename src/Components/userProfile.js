import { useAtom } from 'jotai';
import { userAtom } from '../atoms/userAtom';

function UserProfile() {
  const [user] = useAtom(userAtom);

  if (!user) return <p>Please log in.</p>;

  return (
    <div className="p-4 bg-gray-900 text-white rounded-lg">
      <img src={user.picture} alt={user.name} className="w-16 h-16 rounded-full mb-2" />
      <h2 className="text-xl font-bold">{user.name}</h2>
      <p className="text-gray-400">{user.email}</p>
    </div>
  );
}

export default UserProfile;
// Compare this snippet from Client/src/atoms/userAtom.js: