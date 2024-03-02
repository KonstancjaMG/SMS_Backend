import Profile from '../models/profile.js';
import User from '../models/user.js';

const findProfileByUserId = async (userId) => {
  return await Profile.findOne({ where: { UserId: userId } });
};

const createProfile = async (userId, profileData) => {
    const user = await User.findByPk(userId);
    console.log(user)
    if (!user) {
      throw new Error('User not found');
    }

    const existingProfile = await Profile.findOne({ where: { UserId: userId } });
    if (existingProfile) {
      throw new Error('Profile already exists for this user');
    }
  
    const completeProfileData = { ...profileData, UserId: userId };
    return await Profile.create(completeProfileData);
  };

const updateProfileByUserId = async (userId, data) => {
  const profile = await Profile.findOne({ where: { UserId: userId } });
  if (profile) {
    return await profile.update(data);
  }
  return null;
};

const deleteProfileByUserId = async (userId) => {
  const profile = await Profile.findOne({ where: { UserId: userId } });
  if (profile) {
    return await profile.destroy();
  }
  return null;
};

export {findProfileByUserId, createProfile, updateProfileByUserId, deleteProfileByUserId}