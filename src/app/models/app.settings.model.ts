export class AppSettings {
	currency!: string;
	dateFormat!: string;
	headerLogo!: string;
	loginLogo!: string;
	mailLogo!: string;
	mobileBanner!: string;
	timezone!: string;
}

export class AppCommission {
	POSSubscriptionCharge!: number;
	minimumPayout!: number;
	platformLogisticCharge!: number;
	platformLogisticChargeType!: string; // percentage or fixed
	platformOnlineCharge!: number;
	platformOnlineChargeType!: string; // percentage or fixed
}
