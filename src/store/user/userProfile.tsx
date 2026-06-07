import { create } from "zustand";

import { USER_STATUS, UserStatusType } from "src/components/user-status/user-status-item";


const SOCIAL_LINKS = [
    {
        name: 'facebook',
        logo: 'eva:facebook-fill',
        color: '#1877F2',
    },
    {
        name: 'instagram',
        logo: 'ant-design:instagram-filled',
        color: '#DF3E30',
    },
    {
        name: 'linkedin',
        logo: 'eva:linkedin-fill',
        color: '#006097',
    },
    {
        name: 'twitter',
        logo: 'eva:twitter-fill',
        color: '#1C9CEA',
    }
]

interface UserProfileState {
    status: string[],
    statusData: UserStatusType[],
    socialLinks: {
        [key: string]: string;
    }[],
    socialLinksData: {
        [key: string]: string;
    }[],
    setStatus: (v: string[]) => void,
    setStatusData: (v: UserStatusType[]) => void,
    setSocialLinks: (v: {
        [key: string]: string;
    }[]) => void,
    setSocialLinksData: (v: {
        [key: string]: string;
    }[]) => void,
    userInfo: any,
    setUserInfo: (v: any) => void,
    userProfileInfo: any,
    setUserProfileInfo: (v: any) => void,
}

export const useUserProfile = create<UserProfileState>((set, get) => ({
    status: ["offline", "offline", "offline"],
    statusData: USER_STATUS,
    socialLinks: [
        {
            name: 'facebook',
            value: "socialLinks.facebook",
        },
        {
            name: 'instagram',
            value: 'socialLinks.instagram',
        },
    ],
    socialLinksData: SOCIAL_LINKS,
    setStatus: ((_data: string[]) => {
        set((state) => ({
            ...state,
            status: [..._data]
        }))
    }),
    setStatusData: ((_data: UserStatusType[]) => {
        set((state) => ({
            ...state,
            statusData: [..._data]
        }))
    }),
    setSocialLinks: ((_data: {
        [key: string]: string;
    }[]) => {
        set((state) => ({
            ...state,
            socialLinks: [..._data]
        }))
    }),
    setSocialLinksData: ((_data: {
        [key: string]: string;
    }[]) => {
        set((state) => ({
            ...state,
            socialLinksData: [..._data]
        }))
    }),
    userInfo: {},
    setUserInfo: ((_data: any) => {
        set((state) => ({
            ...state,
            userInfo: { ..._data }
        }))
    }),
    userProfileInfo: {},
    setUserProfileInfo: ((_data: any) => {
        set((state) => ({
            ...state,
            userProfileInfo: { ..._data }
        }))
    })
}))