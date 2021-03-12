export type EnvType = {
    corsAnywhereUrl: string;
    alfa: boolean;
    mono: boolean;
    universal: boolean;
    otp: boolean;
    nbu: boolean;
    privat: boolean;
};

export const getConfig = (envConfig?: Partial<EnvType>): EnvType => ({
    corsAnywhereUrl: 'http://localhost:8080/',
    alfa: true,
    mono: true,
    universal: true,
    otp: true,
    nbu: true,
    privat: true,
    ...envConfig,
});
