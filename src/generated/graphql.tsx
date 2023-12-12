// THIS IS A GENERATED FILE, use `npm run codegen` to regenerate
/* tslint:disable */
import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Any: { input: any; output: any; }
  Date: { input: any; output: any; }
};

export type AccountCategory = {
  __typename?: 'AccountCategory';
  accountCategoryTypes?: Maybe<Array<Maybe<AccountCategoryType>>>;
  createdAt?: Maybe<Scalars['Date']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['Date']['output']>;
};

export type AccountCategoryType = {
  __typename?: 'AccountCategoryType';
  accountCategory?: Maybe<AccountCategory>;
  accountCategoryId?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['Date']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['Date']['output']>;
};

export type AddInvoiceCustomer = {
  customerId: Scalars['String']['input'];
};

export type AddOn = {
  __typename?: 'AddOn';
  addOnPrice?: Maybe<Scalars['Float']['output']>;
  createdAt?: Maybe<Scalars['Date']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  quantity?: Maybe<Scalars['Float']['output']>;
  subscription?: Maybe<Subscription>;
  subscriptionId?: Maybe<Scalars['String']['output']>;
  total?: Maybe<Scalars['Float']['output']>;
};

export type AddOnOption = {
  __typename?: 'AddOnOption';
  addOnName?: Maybe<Scalars['String']['output']>;
  addOnPrice?: Maybe<Scalars['Float']['output']>;
  createdAt?: Maybe<Scalars['Date']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  maxQuantity?: Maybe<Scalars['Float']['output']>;
  updatedAt?: Maybe<Scalars['Date']['output']>;
};

export type AddWaitlist = {
  email: Scalars['String']['input'];
  fullname?: InputMaybe<Scalars['String']['input']>;
  mobile?: InputMaybe<Scalars['String']['input']>;
};

export type Authorization = {
  mode?: InputMaybe<Scalars['String']['input']>;
  pin?: InputMaybe<Scalars['String']['input']>;
};

export type BillingPlan = {
  __typename?: 'BillingPlan';
  createdAt?: Maybe<Scalars['Date']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  planName?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['Date']['output']>;
};

export type Business = {
  __typename?: 'Business';
  businessCategory?: Maybe<BusinessCategory>;
  businessCategoryId: Scalars['String']['output'];
  businessEmail?: Maybe<Scalars['String']['output']>;
  businessInitials?: Maybe<Scalars['String']['output']>;
  businessMobile?: Maybe<Scalars['String']['output']>;
  businessName: Scalars['String']['output'];
  cards?: Maybe<Array<Maybe<Card>>>;
  createdAt?: Maybe<Scalars['Date']['output']>;
  createdBy?: Maybe<User>;
  createdById?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  logo?: Maybe<Scalars['String']['output']>;
  settlementAccounts?: Maybe<Array<Maybe<SettlementAccount>>>;
  updatedAt?: Maybe<Scalars['Date']['output']>;
};

export type BusinessCategory = {
  __typename?: 'BusinessCategory';
  categoryName: Scalars['String']['output'];
  createdAt?: Maybe<Scalars['Date']['output']>;
  id: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['Date']['output']>;
};

export type BusinessChartOfAccount = {
  __typename?: 'BusinessChartOfAccount';
  accountCategoryType?: Maybe<AccountCategoryType>;
  accountCategoryTypeId?: Maybe<Scalars['String']['output']>;
  business?: Maybe<Business>;
  businessId?: Maybe<Scalars['String']['output']>;
  code?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['Date']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['Date']['output']>;
};

export type BusinessProductUnit = {
  __typename?: 'BusinessProductUnit';
  business?: Maybe<Business>;
  businessId?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['Date']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  isArchived?: Maybe<Scalars['Boolean']['output']>;
  unitName?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['Date']['output']>;
};

export type BusinessServiceUnit = {
  __typename?: 'BusinessServiceUnit';
  business?: Maybe<Business>;
  businessId?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['Date']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  isArchived?: Maybe<Scalars['Boolean']['output']>;
  unitName?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['Date']['output']>;
};

export type Card = {
  __typename?: 'Card';
  address?: Maybe<Scalars['String']['output']>;
  business?: Maybe<Business>;
  businessId?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['Date']['output']>;
  cvv?: Maybe<Scalars['String']['output']>;
  expiry?: Maybe<Scalars['String']['output']>;
  first6Digits?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  last4Digits?: Maybe<Scalars['String']['output']>;
  subscriptionPayment?: Maybe<Array<Maybe<SubscriptionPayment>>>;
  token?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
};

export type CardDetails = {
  amount?: InputMaybe<Scalars['Float']['input']>;
  card_number?: InputMaybe<Scalars['String']['input']>;
  currency?: InputMaybe<Scalars['String']['input']>;
  cvv?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  enckey?: InputMaybe<Scalars['String']['input']>;
  expiry_month?: InputMaybe<Scalars['String']['input']>;
  expiry_year?: InputMaybe<Scalars['String']['input']>;
  fullname?: InputMaybe<Scalars['String']['input']>;
  redirect_url?: InputMaybe<Scalars['String']['input']>;
  tx_ref?: InputMaybe<Scalars['String']['input']>;
};

export type CardDetailsB = {
  amount?: InputMaybe<Scalars['Float']['input']>;
  authorization?: InputMaybe<Authorization>;
  card_number?: InputMaybe<Scalars['String']['input']>;
  currency?: InputMaybe<Scalars['String']['input']>;
  cvv?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  enckey?: InputMaybe<Scalars['String']['input']>;
  expiry_month?: InputMaybe<Scalars['String']['input']>;
  expiry_year?: InputMaybe<Scalars['String']['input']>;
  fullname?: InputMaybe<Scalars['String']['input']>;
  redirect_url?: InputMaybe<Scalars['String']['input']>;
  tx_ref?: InputMaybe<Scalars['String']['input']>;
};

export type Category = {
  __typename?: 'Category';
  business?: Maybe<Business>;
  businessId?: Maybe<Scalars['String']['output']>;
  categoryName: Scalars['String']['output'];
  createdAt?: Maybe<Scalars['Date']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['Date']['output']>;
};

export type ChangePassword = {
  newPassword: Scalars['String']['input'];
};

export type ChangePlanAndAddOn = {
  addOnQuantity?: InputMaybe<Scalars['Float']['input']>;
  businessId: Scalars['String']['input'];
  newAddOnOptionId?: InputMaybe<Scalars['String']['input']>;
  newPlanId?: InputMaybe<Scalars['String']['input']>;
};

export type ChartOfAccount = {
  __typename?: 'ChartOfAccount';
  accountCategoryType?: Maybe<AccountCategoryType>;
  accountCategoryTypeId?: Maybe<Scalars['String']['output']>;
  code?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['Date']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['Date']['output']>;
};

export type CombinedChartOfAccount = {
  __typename?: 'CombinedChartOfAccount';
  accountCategoryType: AccountCategoryType;
  accountCategoryTypeId?: Maybe<Scalars['String']['output']>;
  business?: Maybe<Business>;
  businessId?: Maybe<Scalars['String']['output']>;
  code: Scalars['String']['output'];
  description: Scalars['String']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type CombinedProductUnit = {
  __typename?: 'CombinedProductUnit';
  createdAt?: Maybe<Scalars['Date']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  isArchived?: Maybe<Scalars['Boolean']['output']>;
  unitName?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['Date']['output']>;
};

export type CombinedServiceUnit = {
  __typename?: 'CombinedServiceUnit';
  createdAt?: Maybe<Scalars['Date']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  isArchived?: Maybe<Scalars['Boolean']['output']>;
  unitName?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['Date']['output']>;
};

export type CreateAccountCategory = {
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

export type CreateAccountCategoryType = {
  accountCategoryId: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type CreateAddOnOption = {
  addOnName: Scalars['String']['input'];
  addOnPrice: Scalars['Float']['input'];
};

export type CreateBillingPlan = {
  planName: Scalars['String']['input'];
};

export type CreateBusiness = {
  businessCategoryId: Scalars['String']['input'];
  businessEmail: Scalars['String']['input'];
  businessMobile: Scalars['String']['input'];
  businessName: Scalars['String']['input'];
};

export type CreateBusinessCoa = {
  accountCategoryTypeId: Scalars['String']['input'];
  businessId: Scalars['String']['input'];
  code: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

export type CreateBusinessCategory = {
  categoryName: Scalars['String']['input'];
};

export type CreateBusinessForTesting = {
  businessCategoryId: Scalars['String']['input'];
  businessEmail: Scalars['String']['input'];
  businessMobile: Scalars['String']['input'];
  businessName: Scalars['String']['input'];
  userEmail: Scalars['String']['input'];
};

export type CreateBusinessProductUnit = {
  businessId: Scalars['String']['input'];
  unitName: Scalars['String']['input'];
};

export type CreateBusinessServiceUnit = {
  businessId: Scalars['String']['input'];
  unitName: Scalars['String']['input'];
};

export type CreateCategory = {
  businessId: Scalars['String']['input'];
  categoryName: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
};

export type CreateChartOfAccount = {
  accountCategoryTypeId: Scalars['String']['input'];
  code: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

export type CreateCompleteExpenseWithCsv = {
  creditAccountCode: Scalars['String']['input'];
  datePaid: Scalars['Date']['input'];
  dateReceived: Scalars['Date']['input'];
  description: Scalars['String']['input'];
  expenseDate: Scalars['Date']['input'];
  index: Scalars['Float']['input'];
  invoiceDate: Scalars['Date']['input'];
  invoiceReference: Scalars['String']['input'];
  itemDescription: Scalars['String']['input'];
  merchant: Scalars['String']['input'];
  merchantEmail: Scalars['String']['input'];
  quantity: Scalars['Float']['input'];
  reference: Scalars['String']['input'];
  unitPrice: Scalars['Float']['input'];
};

export type CreateCompleteInvoice = {
  businessId: Scalars['String']['input'];
  customerId: Scalars['String']['input'];
  product?: InputMaybe<Array<InputMaybe<ProductDetail>>>;
  reference: Scalars['String']['input'];
  service?: InputMaybe<Array<InputMaybe<ServiceDetail>>>;
};

export type CreateCompleteInvoiceB = {
  VAT: Scalars['Float']['input'];
  businessId: Scalars['String']['input'];
  customerId: Scalars['String']['input'];
  dateOfIssue: Scalars['Date']['input'];
  discount?: InputMaybe<Scalars['Float']['input']>;
  dueDate: Scalars['Date']['input'];
  item: Array<ItemDetail>;
};

export type CreateCompletePurchaseCsvData = {
  datePaid: Scalars['Date']['input'];
  dateReceived: Scalars['Date']['input'];
  description: Scalars['String']['input'];
  index: Scalars['Float']['input'];
  invoiceDate: Scalars['Date']['input'];
  invoiceReference: Scalars['String']['input'];
  itemDescription: Scalars['String']['input'];
  merchant: Scalars['String']['input'];
  merchantEmail: Scalars['String']['input'];
  productId: Scalars['String']['input'];
  quantity: Scalars['Float']['input'];
  reference: Scalars['String']['input'];
  transactionDate: Scalars['Date']['input'];
  unitPrice: Scalars['Float']['input'];
};

export type CreateCompletedSaleCsvData = {
  VAT: Scalars['Float']['input'];
  customerId: Scalars['String']['input'];
  dateOfIssue: Scalars['Date']['input'];
  datePaid: Scalars['Date']['input'];
  description: Scalars['String']['input'];
  discount?: InputMaybe<Scalars['Float']['input']>;
  dueDate: Scalars['Date']['input'];
  expenseAmount?: InputMaybe<Scalars['Float']['input']>;
  expenseDatePaid?: InputMaybe<Scalars['Date']['input']>;
  expenseDescription?: InputMaybe<Scalars['String']['input']>;
  expenseIndex?: InputMaybe<Scalars['Float']['input']>;
  expensePaymentReference?: InputMaybe<Scalars['String']['input']>;
  index: Scalars['Float']['input'];
  itemId: Scalars['String']['input'];
  price: Scalars['Float']['input'];
  quantity: Scalars['Float']['input'];
  reference: Scalars['String']['input'];
  serviceExpenseAmount?: InputMaybe<Scalars['Float']['input']>;
  serviceExpenseDatePaid?: InputMaybe<Scalars['Date']['input']>;
  serviceExpenseId?: InputMaybe<Scalars['String']['input']>;
  serviceExpenseIndex?: InputMaybe<Scalars['Float']['input']>;
  serviceExpensePaymentDescription?: InputMaybe<Scalars['String']['input']>;
  serviceExpensePaymentReference?: InputMaybe<Scalars['String']['input']>;
  type: Scalars['String']['input'];
};

export type CreateCustomer = {
  address?: InputMaybe<Scalars['String']['input']>;
  businessId: Scalars['String']['input'];
  email: Scalars['String']['input'];
  mobile: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type CreateCustomerWithCsv = {
  address?: InputMaybe<Scalars['String']['input']>;
  businessId: Scalars['String']['input'];
  createdById: Scalars['String']['input'];
  email: Scalars['String']['input'];
  mobile: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type CreateExpense = {
  businessId: Scalars['String']['input'];
  description: Scalars['String']['input'];
  expenseCategoryId?: InputMaybe<Scalars['String']['input']>;
  expenseDate: Scalars['Date']['input'];
  expenseItem: Array<ExpenseDetail>;
  merchantId: Scalars['String']['input'];
  recurring?: InputMaybe<Scalars['Boolean']['input']>;
};

export type CreateExpenseCategory = {
  name: Scalars['String']['input'];
};

export type CreateExpenseWithCsv = {
  creditAccountCode: Scalars['String']['input'];
  description: Scalars['String']['input'];
  expenseDate: Scalars['Date']['input'];
  index: Scalars['Float']['input'];
  itemDescription: Scalars['String']['input'];
  merchantId: Scalars['String']['input'];
  quantity: Scalars['Float']['input'];
  reference: Scalars['String']['input'];
  unitPrice: Scalars['Float']['input'];
};

export type CreateGeneralJournal = {
  amount: Scalars['Float']['input'];
  businessId: Scalars['String']['input'];
  chartOfAccountId: Scalars['String']['input'];
  createdById: Scalars['String']['input'];
  description: Scalars['String']['input'];
  productId?: InputMaybe<Scalars['String']['input']>;
  reference: Scalars['String']['input'];
  transactionDate: Scalars['Date']['input'];
  transactionType: Scalars['String']['input'];
};

export type CreateInvite = {
  email: Scalars['String']['input'];
  fullname: Scalars['String']['input'];
  roleId: Scalars['String']['input'];
};

export type CreateInvoice = {
  businessId: Scalars['String']['input'];
};

export type CreateManyInvoicesInput = {
  VAT: Scalars['Float']['input'];
  customerId: Scalars['String']['input'];
  dateOfIssue: Scalars['Date']['input'];
  discount?: InputMaybe<Scalars['Float']['input']>;
  dueDate: Scalars['Date']['input'];
  item: Array<InputMaybe<ItemDetail>>;
  reference: Scalars['String']['input'];
};

export type CreateManyInvoicesInputB = {
  VAT: Scalars['Float']['input'];
  customerId: Scalars['String']['input'];
  dateOfIssue: Scalars['Date']['input'];
  datePaid?: InputMaybe<Scalars['Date']['input']>;
  discount?: InputMaybe<Scalars['Float']['input']>;
  dueDate: Scalars['Date']['input'];
  index: Scalars['Float']['input'];
  itemId: Scalars['String']['input'];
  paidFully?: InputMaybe<Scalars['Boolean']['input']>;
  price: Scalars['Float']['input'];
  quantity: Scalars['Float']['input'];
  reference: Scalars['String']['input'];
  type: Scalars['String']['input'];
};

export type CreateMerchant = {
  businessId: Scalars['String']['input'];
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type CreateMerchantInvoice = {
  businessId: Scalars['String']['input'];
  invoiceDate: Scalars['Date']['input'];
  itemDetail: Array<InputMaybe<MerchantInvoiceDetails>>;
  merchantId: Scalars['String']['input'];
};

export type CreateMerchantWithCsv = {
  businessId: Scalars['String']['input'];
  createdById: Scalars['String']['input'];
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type CreateOffer = {
  description: Scalars['String']['input'];
  discountAmount: Scalars['Float']['input'];
  discountPercentage?: InputMaybe<Scalars['Int']['input']>;
  includePlanId: Scalars['String']['input'];
  offerName: Scalars['String']['input'];
  prerequisitePlanId?: InputMaybe<Scalars['String']['input']>;
};

export type CreateOption = {
  optionName: Scalars['String']['input'];
};

export type CreateOptionIncluded = {
  optionId: Scalars['String']['input'];
  planId: Scalars['String']['input'];
};

export type CreatePayment = {
  amount: Scalars['Float']['input'];
  businessId: Scalars['String']['input'];
  dateReceived?: InputMaybe<Scalars['Date']['input']>;
  invoiceId: Scalars['String']['input'];
  paymentMethod: Scalars['String']['input'];
  remarks: Scalars['String']['input'];
};

export type CreatePlan = {
  currentPrice: Scalars['Float']['input'];
  isActive: Scalars['Boolean']['input'];
  optionData: Array<OptionData>;
  planName: Scalars['String']['input'];
};

export type CreateProduct = {
  businessId: Scalars['String']['input'];
  categoryId?: InputMaybe<Scalars['String']['input']>;
  image?: InputMaybe<Scalars['String']['input']>;
  initialStockLevel?: InputMaybe<Scalars['Float']['input']>;
  price: Scalars['Float']['input'];
  productName: Scalars['String']['input'];
  productUnitId: Scalars['String']['input'];
};

export type CreateProductInvoiceDetail = {
  invoiceId: Scalars['String']['input'];
  price: Scalars['Float']['input'];
  productId: Scalars['String']['input'];
  quantity: Scalars['Float']['input'];
  unitPrice: Scalars['Float']['input'];
};

export type CreateProductSaleItem = {
  price: Scalars['Float']['input'];
  pricePerUnit: Scalars['Float']['input'];
  productId: Scalars['String']['input'];
  quantity: Scalars['Float']['input'];
  saleId: Scalars['String']['input'];
  tax: Scalars['Float']['input'];
};

export type CreateProductUnit = {
  unitName: Scalars['String']['input'];
};

export type CreateProductWithCsv = {
  businessId: Scalars['String']['input'];
  initialStockLevel: Scalars['Float']['input'];
  price: Scalars['Float']['input'];
  productName: Scalars['String']['input'];
  productUnit: Scalars['String']['input'];
  type: Scalars['String']['input'];
};

export type CreatePurchase = {
  businessId: Scalars['String']['input'];
  description: Scalars['String']['input'];
  merchantId: Scalars['String']['input'];
  purchaseItem: Array<PurchaseItemDetail>;
  transactionDate: Scalars['Date']['input'];
};

export type CreatePurchaseCsvData = {
  description: Scalars['String']['input'];
  index: Scalars['Float']['input'];
  itemDescription: Scalars['String']['input'];
  merchantId: Scalars['String']['input'];
  productId: Scalars['String']['input'];
  quantity: Scalars['Float']['input'];
  reference: Scalars['String']['input'];
  transactionDate: Scalars['Date']['input'];
  unitPrice: Scalars['Float']['input'];
};

export type CreatePurchaseItem = {
  description: Scalars['String']['input'];
  index: Scalars['Float']['input'];
  price: Scalars['Float']['input'];
  productId: Scalars['String']['input'];
  purchaseId: Scalars['String']['input'];
  quantity: Scalars['Float']['input'];
  unitPrice: Scalars['Float']['input'];
};

export type CreateRole = {
  roleDescription?: InputMaybe<Scalars['String']['input']>;
  roleName: Scalars['String']['input'];
};

export type CreateSale = {
  businessId: Scalars['String']['input'];
  paidAt?: InputMaybe<Scalars['Date']['input']>;
  saleAmount: Scalars['Float']['input'];
  saleAmountPaid: Scalars['Float']['input'];
  saleStatusId: Scalars['String']['input'];
  tax: Scalars['Float']['input'];
};

export type CreateSaleCsvData = {
  VAT: Scalars['Float']['input'];
  customerId: Scalars['String']['input'];
  dateOfIssue: Scalars['Date']['input'];
  description: Scalars['String']['input'];
  discount?: InputMaybe<Scalars['Float']['input']>;
  dueDate: Scalars['Date']['input'];
  expenseAmount?: InputMaybe<Scalars['Float']['input']>;
  expenseDescription?: InputMaybe<Scalars['String']['input']>;
  expenseIndex?: InputMaybe<Scalars['Float']['input']>;
  index: Scalars['Float']['input'];
  itemId: Scalars['String']['input'];
  price: Scalars['Float']['input'];
  quantity: Scalars['Float']['input'];
  reference: Scalars['String']['input'];
  serviceExpenseAmount?: InputMaybe<Scalars['Float']['input']>;
  serviceExpenseId?: InputMaybe<Scalars['String']['input']>;
  serviceExpenseIndex?: InputMaybe<Scalars['Float']['input']>;
  type: Scalars['String']['input'];
};

export type CreateSaleEntry = {
  description: Scalars['String']['input'];
  invoiceInput: CreateCompleteInvoiceB;
  saleExpense?: InputMaybe<Array<SaleExpenseItem>>;
  saleServiceExpense?: InputMaybe<Array<SaleServiceExpenseEntry>>;
};

export type CreateSaleStatus = {
  businessId: Scalars['String']['input'];
  statusName: Scalars['String']['input'];
};

export type CreateService = {
  businessId: Scalars['String']['input'];
  categoryId?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  price: Scalars['Float']['input'];
  serviceUnitId: Scalars['String']['input'];
  tax?: InputMaybe<Scalars['Float']['input']>;
};

export type CreateServiceInvoiceDetail = {
  invoiceId: Scalars['String']['input'];
  price: Scalars['Float']['input'];
  quantity: Scalars['Float']['input'];
  serviceId: Scalars['String']['input'];
  unitPrice: Scalars['Float']['input'];
};

export type CreateServiceSaleItem = {
  price: Scalars['Float']['input'];
  saleId: Scalars['String']['input'];
  serviceId: Scalars['String']['input'];
  tax: Scalars['Float']['input'];
};

export type CreateServiceUnit = {
  unitName: Scalars['String']['input'];
};

export type CreateServiceWithCsv = {
  name: Scalars['String']['input'];
  price: Scalars['Float']['input'];
  serviceUnit: Scalars['String']['input'];
  type: Scalars['String']['input'];
};

export type CreateSettlementAccount = {
  accountName: Scalars['String']['input'];
  accountNumber: Scalars['String']['input'];
  bankName: Scalars['String']['input'];
  businessId: Scalars['String']['input'];
};

export type CreateSubscription = {
  addOnOptionId?: InputMaybe<Scalars['String']['input']>;
  addOnQuantity?: InputMaybe<Scalars['Float']['input']>;
  billingAddress?: InputMaybe<Scalars['String']['input']>;
  businessId: Scalars['String']['input'];
  cardCVV: Scalars['String']['input'];
  cardExpiry: Scalars['String']['input'];
  cardNumber: Scalars['String']['input'];
  cardPin: Scalars['String']['input'];
  cardType?: InputMaybe<Scalars['String']['input']>;
  currentPlanId: Scalars['String']['input'];
  offerId?: InputMaybe<Scalars['String']['input']>;
  tax: Scalars['Float']['input'];
};

export type CreateSubscriptionAfterPayment = {
  addOnOptionId?: InputMaybe<Scalars['String']['input']>;
  addOnQuantity?: InputMaybe<Scalars['Float']['input']>;
  businessId: Scalars['String']['input'];
  currentPlanId: Scalars['String']['input'];
  offerId?: InputMaybe<Scalars['String']['input']>;
  tax: Scalars['Float']['input'];
};

export type CreateSubscriptionTokenizedInput = {
  addOnOptionId?: InputMaybe<Scalars['String']['input']>;
  addOnQuantity?: InputMaybe<Scalars['Float']['input']>;
  businessId: Scalars['String']['input'];
  cardNumber: Scalars['String']['input'];
  currentPlanId: Scalars['String']['input'];
  offerId?: InputMaybe<Scalars['String']['input']>;
  tax: Scalars['Float']['input'];
};

export type CreateUserInvite = {
  businessId: Scalars['String']['input'];
  email: Scalars['String']['input'];
  fullname: Scalars['String']['input'];
  roleId: Scalars['String']['input'];
};

export type Customer = {
  __typename?: 'Customer';
  address?: Maybe<Scalars['String']['output']>;
  business?: Maybe<Business>;
  businessId: Scalars['String']['output'];
  createdAt?: Maybe<Scalars['Date']['output']>;
  createdBy?: Maybe<User>;
  createdById?: Maybe<Scalars['String']['output']>;
  email: Scalars['String']['output'];
  expenses?: Maybe<Array<Maybe<Expense>>>;
  id: Scalars['String']['output'];
  invoices?: Maybe<Array<Maybe<Invoice>>>;
  isArchived?: Maybe<Scalars['Boolean']['output']>;
  mobile: Scalars['String']['output'];
  name: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['Date']['output']>;
};

export type DailyExpense = {
  __typename?: 'DailyExpense';
  expenseDate: Scalars['Date']['output'];
  totalExpenses: Scalars['Float']['output'];
};

export type DailyInvoiceAndSale = {
  __typename?: 'DailyInvoiceAndSale';
  date: Scalars['Date']['output'];
  totalInvoiceAmount: Scalars['Float']['output'];
  totalSalesAmount: Scalars['Float']['output'];
};

export type DailyInvoicePendingAndPaid = {
  __typename?: 'DailyInvoicePendingAndPaid';
  date: Scalars['Date']['output'];
  totalInvoicePaidAmount: Scalars['Float']['output'];
  totalInvoicePendingAmount: Scalars['Float']['output'];
};

export type DailyInvoiceTotalAmounts = {
  __typename?: 'DailyInvoiceTotalAmounts';
  date: Scalars['Date']['output'];
  dayOfWeek?: Maybe<Scalars['String']['output']>;
  totalAmount: Scalars['Float']['output'];
  totalPaidAmount: Scalars['Float']['output'];
  totalPendingAmount: Scalars['Float']['output'];
};

export type DeleteResponse = {
  __typename?: 'DeleteResponse';
  message?: Maybe<Scalars['Boolean']['output']>;
};

export type EffectSaleExpense = {
  description: Scalars['String']['input'];
  expenseId: Scalars['String']['input'];
  file?: InputMaybe<Scalars['String']['input']>;
  transactionDate: Scalars['Date']['input'];
};

export type EffectSaleExpenseResponse = {
  __typename?: 'EffectSaleExpenseResponse';
  effected: Scalars['Boolean']['output'];
  saleStatus: Scalars['Float']['output'];
};

export type Employee = {
  __typename?: 'Employee';
  createdAt: Scalars['Date']['output'];
  email: Scalars['String']['output'];
  fullname: Scalars['String']['output'];
  hash: Scalars['String']['output'];
  hashedRt?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  updatedAt: Scalars['Date']['output'];
};

export type EmployeeSignInDetails = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  twoFACode: Scalars['String']['input'];
};

export type EmployeeToken = {
  __typename?: 'EmployeeToken';
  access_token: Scalars['String']['output'];
  employeeEmail: Scalars['String']['output'];
  refresh_token: Scalars['String']['output'];
};

export type Expense = {
  __typename?: 'Expense';
  amount: Scalars['Float']['output'];
  archived?: Maybe<Scalars['Boolean']['output']>;
  business?: Maybe<Business>;
  businessChartOfAccount?: Maybe<BusinessChartOfAccount>;
  businessChartOfAccountId?: Maybe<Scalars['String']['output']>;
  businessId: Scalars['String']['output'];
  chartOfAccount?: Maybe<ChartOfAccount>;
  chartOfAccountId?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['Date']['output'];
  createdBy?: Maybe<User>;
  createdById?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  expenseCategory?: Maybe<ExpenseCategory>;
  expenseCategoryId: Scalars['String']['output'];
  expenseClearingAccount?: Maybe<ExpenseClearingAccount>;
  expenseDate?: Maybe<Scalars['Date']['output']>;
  expenseItems?: Maybe<Array<Maybe<ExpenseItem>>>;
  expenseLines?: Maybe<Array<Maybe<ExpenseLine>>>;
  expensePayments?: Maybe<Array<Maybe<ExpensePayment>>>;
  expenseStatus?: Maybe<ExpenseStatusRef>;
  expenseStatusId?: Maybe<Scalars['Int']['output']>;
  id: Scalars['String']['output'];
  merchant?: Maybe<Merchant>;
  merchantId?: Maybe<Scalars['String']['output']>;
  paid?: Maybe<Scalars['Boolean']['output']>;
  paidAt?: Maybe<Scalars['Date']['output']>;
  recurring?: Maybe<Scalars['Boolean']['output']>;
  reference?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['Date']['output'];
};

export type ExpenseAmountByCategory = {
  __typename?: 'ExpenseAmountByCategory';
  name: Scalars['String']['output'];
  totalExpense: Scalars['Float']['output'];
};

export type ExpenseAmountByCategoryForMonth = {
  __typename?: 'ExpenseAmountByCategoryForMonth';
  name: Scalars['String']['output'];
  totalExpenseThisMonth: Scalars['Float']['output'];
};

export type ExpenseAmountByCategoryForQuarter = {
  __typename?: 'ExpenseAmountByCategoryForQuarter';
  name: Scalars['String']['output'];
  totalExpenseThisQuarter: Scalars['Float']['output'];
};

export type ExpenseAmountByCategoryForWeek = {
  __typename?: 'ExpenseAmountByCategoryForWeek';
  name: Scalars['String']['output'];
  totalExpenseThisWeek: Scalars['Float']['output'];
};

export type ExpenseAmountByCategoryForYear = {
  __typename?: 'ExpenseAmountByCategoryForYear';
  name: Scalars['String']['output'];
  totalExpenseThisYear: Scalars['Float']['output'];
};

export type ExpenseCategory = {
  __typename?: 'ExpenseCategory';
  business?: Maybe<Business>;
  businessId: Scalars['String']['output'];
  createdAt: Scalars['Date']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['Date']['output'];
};

export type ExpenseClearingAccount = {
  __typename?: 'ExpenseClearingAccount';
  business?: Maybe<Business>;
  businessId?: Maybe<Scalars['String']['output']>;
  chartOfAccount?: Maybe<ChartOfAccount>;
  chartOfAccountId?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['Date']['output']>;
  expense?: Maybe<Expense>;
  expenseId?: Maybe<Scalars['String']['output']>;
  expenseMerchantInvoices?: Maybe<Array<Maybe<ExpenseMerchantInvoice>>>;
  id?: Maybe<Scalars['String']['output']>;
  openBalance?: Maybe<Scalars['Float']['output']>;
  updatedAt?: Maybe<Scalars['Date']['output']>;
};

export type ExpenseDetail = {
  creditAccountId: Scalars['String']['input'];
  description: Scalars['String']['input'];
  index: Scalars['Float']['input'];
  quantity: Scalars['Float']['input'];
  unitPrice: Scalars['Float']['input'];
};

export type ExpenseItem = {
  __typename?: 'ExpenseItem';
  archived?: Maybe<Scalars['Boolean']['output']>;
  businessChartOfAccount?: Maybe<BusinessChartOfAccount>;
  businessChartOfAccountId?: Maybe<Scalars['String']['output']>;
  chartOfAccount?: Maybe<ChartOfAccount>;
  chartOfAccountId?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['Date']['output'];
  description?: Maybe<Scalars['String']['output']>;
  expense?: Maybe<Expense>;
  expenseId?: Maybe<Scalars['String']['output']>;
  expenseLines?: Maybe<ExpenseLine>;
  id?: Maybe<Scalars['String']['output']>;
  index?: Maybe<Scalars['Float']['output']>;
  price?: Maybe<Scalars['Float']['output']>;
  priceOfReceived?: Maybe<Scalars['Float']['output']>;
  quantity?: Maybe<Scalars['Float']['output']>;
  quantityReceived?: Maybe<Scalars['Float']['output']>;
  received?: Maybe<Scalars['Boolean']['output']>;
  unitPrice?: Maybe<Scalars['Float']['output']>;
  updatedAt: Scalars['Date']['output'];
};

export type ExpenseItemReceived = {
  businessId: Scalars['String']['input'];
  expenseItemId: Scalars['String']['input'];
  quantity: Scalars['Float']['input'];
  transactionDate: Scalars['Date']['input'];
};

export type ExpenseLine = {
  __typename?: 'ExpenseLine';
  business?: Maybe<Business>;
  businessChartOfAccount?: Maybe<BusinessChartOfAccount>;
  businessId: Scalars['String']['output'];
  chartOfAccount?: Maybe<ChartOfAccount>;
  createdAt?: Maybe<Scalars['Date']['output']>;
  expense?: Maybe<Expense>;
  expenseId: Scalars['String']['output'];
  expenseItem?: Maybe<ExpenseItem>;
  expenseItemId?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  lineAmount: Scalars['Float']['output'];
  lineBusinessChartOfAccountId?: Maybe<Scalars['String']['output']>;
  lineChartOfAccountId: Scalars['String']['output'];
  lineQuantity?: Maybe<Scalars['Float']['output']>;
  transactionDate: Scalars['Date']['output'];
};

export type ExpenseMerchantInvoice = {
  __typename?: 'ExpenseMerchantInvoice';
  business?: Maybe<Business>;
  businessId?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['Date']['output']>;
  createdBy?: Maybe<User>;
  createdById?: Maybe<Scalars['String']['output']>;
  expenseClearingAccount?: Maybe<ExpenseClearingAccount>;
  expenseClearingAccountId?: Maybe<Scalars['String']['output']>;
  expenseMerchantInvoiceItems?: Maybe<Array<Maybe<ExpenseMerchantInvoiceItem>>>;
  id?: Maybe<Scalars['String']['output']>;
  invoiceDate?: Maybe<Scalars['Date']['output']>;
  merchant?: Maybe<Merchant>;
  merchantId?: Maybe<Scalars['String']['output']>;
  reference?: Maybe<Scalars['String']['output']>;
  totalAmount?: Maybe<Scalars['Float']['output']>;
  updatedAt?: Maybe<Scalars['Date']['output']>;
};

export type ExpenseMerchantInvoiceItem = {
  __typename?: 'ExpenseMerchantInvoiceItem';
  createdAt?: Maybe<Scalars['Date']['output']>;
  createdBy?: Maybe<User>;
  createdById?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  merchantInvoice?: Maybe<ExpenseMerchantInvoice>;
  merchantInvoiceId?: Maybe<Scalars['String']['output']>;
  price?: Maybe<Scalars['Float']['output']>;
  quantity?: Maybe<Scalars['Float']['output']>;
  unitPrice?: Maybe<Scalars['Float']['output']>;
  updatedAt?: Maybe<Scalars['Date']['output']>;
};

export type ExpensePayment = {
  __typename?: 'ExpensePayment';
  business?: Maybe<Business>;
  businessId?: Maybe<Scalars['String']['output']>;
  chartOfAccount?: Maybe<ChartOfAccount>;
  chartOfAccountId?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['Date']['output'];
  createdBy?: Maybe<User>;
  createdById?: Maybe<Scalars['String']['output']>;
  descritpion?: Maybe<Scalars['String']['output']>;
  expense?: Maybe<Expense>;
  expenseId?: Maybe<Scalars['String']['output']>;
  file?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  reference?: Maybe<Scalars['String']['output']>;
  total?: Maybe<Scalars['Float']['output']>;
  transactionDate?: Maybe<Scalars['Date']['output']>;
  updatedAt: Scalars['Date']['output'];
};

export type ExpensePaymentEntry = {
  businessId: Scalars['String']['input'];
  description: Scalars['String']['input'];
  expenseId: Scalars['String']['input'];
  file?: InputMaybe<Scalars['String']['input']>;
  total: Scalars['Float']['input'];
  transactionDate: Scalars['Date']['input'];
};

export type ExpenseStatusRef = {
  __typename?: 'ExpenseStatusRef';
  expenseStatus?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
};

export type ForgotPassword = {
  __typename?: 'ForgotPassword';
  code?: Maybe<Scalars['Float']['output']>;
  codeExpiry?: Maybe<Scalars['Date']['output']>;
  createdAt?: Maybe<Scalars['Date']['output']>;
  email: Scalars['String']['output'];
  id: Scalars['String']['output'];
};

export type ForgotPasswordResponse = {
  __typename?: 'ForgotPasswordResponse';
  message?: Maybe<Scalars['Boolean']['output']>;
};

export type GrirClearingAccount = {
  __typename?: 'GRIRClearingAccount';
  business?: Maybe<Business>;
  businessId?: Maybe<Scalars['String']['output']>;
  chartOfAccount?: Maybe<ChartOfAccount>;
  chartOfAccountId?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['Date']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  openBalance?: Maybe<Scalars['Float']['output']>;
  purchase?: Maybe<Purchase>;
  purchaseId?: Maybe<Scalars['String']['output']>;
  purchaseMerchantInvoices?: Maybe<Array<Maybe<PurchaseMerchantInvoice>>>;
  updatedAt?: Maybe<Scalars['Date']['output']>;
};

export type GeneralJournal = {
  __typename?: 'GeneralJournal';
  amount?: Maybe<Scalars['Float']['output']>;
  business?: Maybe<Business>;
  businessId?: Maybe<Scalars['String']['output']>;
  chartOfAccount?: Maybe<ChartOfAccount>;
  chartOfAccountId?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['Date']['output']>;
  createdBy?: Maybe<User>;
  createdById?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  product?: Maybe<Product>;
  productId?: Maybe<Scalars['String']['output']>;
  reference?: Maybe<Scalars['String']['output']>;
  transactionDate?: Maybe<Scalars['Date']['output']>;
  transactionType?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['Date']['output']>;
};

export type GetBusinessByUser = {
  __typename?: 'GetBusinessByUser';
  businesses?: Maybe<Array<Maybe<Business>>>;
  user?: Maybe<User>;
};

export type GetCustomerResponse = {
  __typename?: 'GetCustomerResponse';
  cursorId?: Maybe<Scalars['String']['output']>;
  customerByBusiness: Array<Maybe<Customer>>;
};

export type GetExpenseCategoryResponse = {
  __typename?: 'GetExpenseCategoryResponse';
  cursorId?: Maybe<Scalars['String']['output']>;
  expenseCategories: Array<Maybe<ExpenseCategory>>;
};

export type GetExpenseResponse = {
  __typename?: 'GetExpenseResponse';
  cursorId?: Maybe<Scalars['String']['output']>;
  expenseByBusiness: Array<Maybe<Expense>>;
};

export type GetInvoiceByBusinessResponse = {
  __typename?: 'GetInvoiceByBusinessResponse';
  cursorId?: Maybe<Scalars['String']['output']>;
  invoicesByBusiness: Array<Maybe<Invoice>>;
};

export type GetInvoiceByCustomerResponse = {
  __typename?: 'GetInvoiceByCustomerResponse';
  cursorId?: Maybe<Scalars['String']['output']>;
  invoiceByCustomer: Array<Maybe<Invoice>>;
};

export type GetProductForWeekResponse = {
  __typename?: 'GetProductForWeekResponse';
  productsInStock?: Maybe<Scalars['Float']['output']>;
  productsOutOfStock?: Maybe<Scalars['Float']['output']>;
  productsThisWeek?: Maybe<Scalars['Float']['output']>;
  totalProductAmountThisWeek?: Maybe<Scalars['Float']['output']>;
};

export type GetProductOrServiceResponse = {
  __typename?: 'GetProductOrServiceResponse';
  cursorId?: Maybe<Scalars['String']['output']>;
  productOrServiceByBusiness: Array<Maybe<ProductOrService>>;
  type?: Maybe<Scalars['String']['output']>;
};

export type GetProductResponse = {
  __typename?: 'GetProductResponse';
  cursorId?: Maybe<Scalars['String']['output']>;
  productByBusiness: Array<Maybe<Product>>;
};

export type GetPurchaseByBusinessResponse = {
  __typename?: 'GetPurchaseByBusinessResponse';
  cursorId?: Maybe<Scalars['String']['output']>;
  purchaseByBusiness: Array<Maybe<Purchase>>;
};

export type GetPurchaseForMonthResponse = {
  __typename?: 'GetPurchaseForMonthResponse';
  paidPurchasesThisMonth?: Maybe<Scalars['Float']['output']>;
  pendingPurchasesThisMonth?: Maybe<Scalars['Float']['output']>;
  percentageIncreaseInPurchaseThisMonth?: Maybe<Scalars['Float']['output']>;
  purchasesThisMonth?: Maybe<Scalars['Float']['output']>;
  totalPaidPurchaseAmountThisMonth?: Maybe<Scalars['Float']['output']>;
  totalPendingPurchaseAmountThisMonth?: Maybe<Scalars['Float']['output']>;
  totalPurchaseAmountThisMonth?: Maybe<Scalars['Float']['output']>;
};

export type GetPurchaseForQuarterResponse = {
  __typename?: 'GetPurchaseForQuarterResponse';
  paidPurchasesThisQuarter?: Maybe<Scalars['Float']['output']>;
  pendingpurchasesThisQuarter?: Maybe<Scalars['Float']['output']>;
  percentageIncreaseInPurchaseThisQuarter?: Maybe<Scalars['Float']['output']>;
  purchasesThisQuarter?: Maybe<Scalars['Float']['output']>;
  totalPaidPurchaseAmountThisQuarter?: Maybe<Scalars['Float']['output']>;
  totalPendingPurchaseAmountThisQuarter?: Maybe<Scalars['Float']['output']>;
  totalPurchaseAmountThisQuarter?: Maybe<Scalars['Float']['output']>;
};

export type GetPurchaseForWeekResponse = {
  __typename?: 'GetPurchaseForWeekResponse';
  paidPurchasesThisWeek?: Maybe<Scalars['Float']['output']>;
  pendingPurchasesThisWeek?: Maybe<Scalars['Float']['output']>;
  percentageIncreaseInPurchaseThisWeek?: Maybe<Scalars['Float']['output']>;
  purchasesThisWeek?: Maybe<Scalars['Float']['output']>;
  totalPaidPurchaseAmountThisWeek?: Maybe<Scalars['Float']['output']>;
  totalPendingPurchaseAmountThisWeek?: Maybe<Scalars['Float']['output']>;
  totalPurchaseAmountThisWeek?: Maybe<Scalars['Float']['output']>;
};

export type GetPurchaseForYearResponse = {
  __typename?: 'GetPurchaseForYearResponse';
  paidPurchasesThisYear?: Maybe<Scalars['Float']['output']>;
  pendingPurchasesThisYear?: Maybe<Scalars['Float']['output']>;
  percentageIncreaseInPurchaseThisYear?: Maybe<Scalars['Float']['output']>;
  purchasesThisYear?: Maybe<Scalars['Float']['output']>;
  totalPaidPurchaseAmountThisYear?: Maybe<Scalars['Float']['output']>;
  totalPendingPurchaseAmountThisYear?: Maybe<Scalars['Float']['output']>;
  totalPurchaseAmountThisYear?: Maybe<Scalars['Float']['output']>;
};

export type GetSaleByBusinessResponse = {
  __typename?: 'GetSaleByBusinessResponse';
  cursorId?: Maybe<Scalars['String']['output']>;
  salesByBusiness: Array<Maybe<Sale>>;
};

export type GetServiceForWeekResponse = {
  __typename?: 'GetServiceForWeekResponse';
  servicesThisWeek?: Maybe<Scalars['Float']['output']>;
  totalServiceAmountThisWeek?: Maybe<Scalars['Float']['output']>;
};

export type GetServiceResponse = {
  __typename?: 'GetServiceResponse';
  cursorId?: Maybe<Scalars['String']['output']>;
  serviceByBusiness: Array<Maybe<Service>>;
};

export type InventoryCostHistory = {
  __typename?: 'InventoryCostHistory';
  business?: Maybe<Business>;
  businessId?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['Date']['output']>;
  effectiveDate?: Maybe<Scalars['Date']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  product?: Maybe<Product>;
  productId?: Maybe<Scalars['String']['output']>;
  productType?: Maybe<Scalars['String']['output']>;
  unitCost?: Maybe<Scalars['Float']['output']>;
};

export type Invite = {
  __typename?: 'Invite';
  createdAt: Scalars['Date']['output'];
  email: Scalars['String']['output'];
  fullname?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  role?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['Date']['output'];
};

export type Invoice = {
  __typename?: 'Invoice';
  VAT?: Maybe<Scalars['Float']['output']>;
  archived?: Maybe<Scalars['Boolean']['output']>;
  business?: Maybe<Business>;
  businessId: Scalars['String']['output'];
  createdAt?: Maybe<Scalars['Date']['output']>;
  customer?: Maybe<Customer>;
  customerId: Scalars['String']['output'];
  dateOfIssue?: Maybe<Scalars['Date']['output']>;
  datePaid?: Maybe<Scalars['Date']['output']>;
  discount?: Maybe<Scalars['Float']['output']>;
  dueDate?: Maybe<Scalars['Date']['output']>;
  id: Scalars['String']['output'];
  invoiceDetails?: Maybe<Array<Maybe<InvoiceDetail>>>;
  overdue?: Maybe<Scalars['Boolean']['output']>;
  paidFully?: Maybe<Scalars['Boolean']['output']>;
  reference: Scalars['String']['output'];
  sale?: Maybe<Sale>;
  subtotal: Scalars['Float']['output'];
  totalAmount: Scalars['Float']['output'];
  updatedAt?: Maybe<Scalars['Date']['output']>;
};

export type InvoiceAndExpenseGraphMonthlyResponse = {
  __typename?: 'InvoiceAndExpenseGraphMonthlyResponse';
  date?: Maybe<Scalars['Date']['output']>;
  totalAmount?: Maybe<Scalars['Float']['output']>;
  totalExpenseAmount?: Maybe<Scalars['Float']['output']>;
  totalInvoiceAmount?: Maybe<Scalars['Float']['output']>;
};

export type InvoiceAndExpenseGraphQuarterlyResponse = {
  __typename?: 'InvoiceAndExpenseGraphQuarterlyResponse';
  expenseAmount?: Maybe<Scalars['Float']['output']>;
  invoiceAmount?: Maybe<Scalars['Float']['output']>;
  month?: Maybe<Scalars['String']['output']>;
  totalAmount?: Maybe<Scalars['Float']['output']>;
};

export type InvoiceAndExpenseGraphWeeklyResponse = {
  __typename?: 'InvoiceAndExpenseGraphWeeklyResponse';
  date?: Maybe<Scalars['Date']['output']>;
  dayOfWeek?: Maybe<Scalars['String']['output']>;
  total?: Maybe<Scalars['Float']['output']>;
  totalExpenseAmount?: Maybe<Scalars['Float']['output']>;
  totalInvoiceAmount?: Maybe<Scalars['Float']['output']>;
};

export type InvoiceAndExpenseGraphYearlyResponse = {
  __typename?: 'InvoiceAndExpenseGraphYearlyResponse';
  month?: Maybe<Scalars['String']['output']>;
  totalAmount?: Maybe<Scalars['Float']['output']>;
  totalExpenseAmount?: Maybe<Scalars['Float']['output']>;
  totalInvoicesAmount?: Maybe<Scalars['Float']['output']>;
};

export type InvoiceDetail = {
  __typename?: 'InvoiceDetail';
  archived?: Maybe<Scalars['Boolean']['output']>;
  business?: Maybe<Business>;
  businessId?: Maybe<Scalars['String']['output']>;
  cost: Scalars['Float']['output'];
  createdAt?: Maybe<Scalars['Date']['output']>;
  discount?: Maybe<Scalars['Float']['output']>;
  id: Scalars['String']['output'];
  index?: Maybe<Scalars['Float']['output']>;
  invoice?: Maybe<Invoice>;
  invoiceId?: Maybe<Scalars['String']['output']>;
  productInvoiceDetail?: Maybe<ProductInvoiceDetail>;
  serviceInvoiceDetail?: Maybe<ServiceInvoiceDetail>;
  type: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['Date']['output']>;
};

export type InvoiceDetailArray = {
  businessId: Scalars['String']['input'];
  cost: Scalars['Float']['input'];
  createdById: Scalars['String']['input'];
  discount?: InputMaybe<Scalars['Float']['input']>;
  index: Scalars['Float']['input'];
  invoiceId: Scalars['String']['input'];
  quantity: Scalars['Float']['input'];
  type: Scalars['String']['input'];
  unitPrice: Scalars['Float']['input'];
};

export type ItemDetail = {
  discount?: InputMaybe<Scalars['Float']['input']>;
  id: Scalars['String']['input'];
  index: Scalars['Float']['input'];
  price: Scalars['Float']['input'];
  quantity: Scalars['Float']['input'];
  type: Scalars['String']['input'];
};

export type LogOutResponse = {
  __typename?: 'LogOutResponse';
  message?: Maybe<Scalars['Boolean']['output']>;
};

export type MakePaymentForExpenseResponse = {
  __typename?: 'MakePaymentForExpenseResponse';
  expenseStatus: Scalars['Float']['output'];
  paid: Scalars['Boolean']['output'];
};

export type MakePurchasePaymentResponse = {
  __typename?: 'MakePurchasePaymentResponse';
  paid: Scalars['Boolean']['output'];
  purchaseStatus: Scalars['Float']['output'];
};

export type MakeSalePayment = {
  description: Scalars['String']['input'];
  file?: InputMaybe<Scalars['String']['input']>;
  saleId: Scalars['String']['input'];
  transactionDate: Scalars['Date']['input'];
};

export type MakeSalePaymentResponse = {
  __typename?: 'MakeSalePaymentResponse';
  paid: Scalars['Boolean']['output'];
  saleStatus: Scalars['Float']['output'];
};

export type MarkExpenseAsReceivedResponse = {
  __typename?: 'MarkExpenseAsReceivedResponse';
  completed: Scalars['Boolean']['output'];
  expenseStatus: Scalars['Float']['output'];
};

export type MarkPurchaseItemAsReceivedResponse = {
  __typename?: 'MarkPurchaseItemAsReceivedResponse';
  completed: Scalars['Boolean']['output'];
  purchaseStatus: Scalars['Float']['output'];
};

export type MarkSaleAsDeliveredResponse = {
  __typename?: 'MarkSaleAsDeliveredResponse';
  delivered: Scalars['Boolean']['output'];
  saleStatus: Scalars['Float']['output'];
};

export type Merchant = {
  __typename?: 'Merchant';
  business?: Maybe<Business>;
  businessId: Scalars['String']['output'];
  createdAt?: Maybe<Scalars['Date']['output']>;
  createdBy?: Maybe<User>;
  createdById?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  expenses?: Maybe<Array<Maybe<Expense>>>;
  id?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['Date']['output']>;
};

export type MerchantInvoice = {
  __typename?: 'MerchantInvoice';
  business?: Maybe<Business>;
  businessId?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['Date']['output']>;
  createdBy?: Maybe<User>;
  createdById?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  invoiceDate?: Maybe<Scalars['Date']['output']>;
  merchant?: Maybe<Merchant>;
  merchantId?: Maybe<Scalars['String']['output']>;
  totalAmount?: Maybe<Scalars['Float']['output']>;
  updatedAt?: Maybe<Scalars['Date']['output']>;
};

export type MerchantInvoiceDetails = {
  description: Scalars['String']['input'];
  productId?: InputMaybe<Scalars['String']['input']>;
  quantity: Scalars['Float']['input'];
  unitPrice: Scalars['Float']['input'];
};

export type MerchantInvoiceItem = {
  __typename?: 'MerchantInvoiceItem';
  createdAt?: Maybe<Scalars['Date']['output']>;
  createdBy?: Maybe<User>;
  createdById?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  merchantInvoice?: Maybe<MerchantInvoice>;
  merchantInvoiceId?: Maybe<Scalars['String']['output']>;
  product?: Maybe<Product>;
  productId?: Maybe<Scalars['String']['output']>;
  productType?: Maybe<Scalars['String']['output']>;
  quantity?: Maybe<Scalars['Float']['output']>;
  unitPrice?: Maybe<Scalars['Float']['output']>;
  updatedAt?: Maybe<Scalars['Date']['output']>;
};

export type MerchantInvoiceToPurchase = {
  businessId: Scalars['String']['input'];
  merchantInvoiceId: Scalars['String']['input'];
  purchaseId: Scalars['String']['input'];
};

export type MonthlySales = {
  __typename?: 'MonthlySales';
  cursorId?: Maybe<Scalars['String']['output']>;
  numberOfSalesThisMonth: Scalars['Float']['output'];
  salesThisMonth: Array<Maybe<Sale>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addInvoiceCustomer?: Maybe<Invoice>;
  addMerchantInvoiceToPurchase?: Maybe<Scalars['Boolean']['output']>;
  addUserToWaitlist?: Maybe<UserWaitlist>;
  adminResetPassword?: Maybe<Scalars['Boolean']['output']>;
  archiveAccountCategory?: Maybe<Scalars['Boolean']['output']>;
  archiveBusinessCOA?: Maybe<Scalars['Boolean']['output']>;
  archiveCard?: Maybe<Scalars['Boolean']['output']>;
  archiveCustomerByBusiness?: Maybe<Scalars['Boolean']['output']>;
  archiveExpense?: Maybe<Scalars['Boolean']['output']>;
  archiveInvoice?: Maybe<Scalars['Boolean']['output']>;
  archiveMerchant?: Maybe<Scalars['Boolean']['output']>;
  archiveProductByBusiness?: Maybe<Scalars['Boolean']['output']>;
  archiveProductUnit?: Maybe<Scalars['Boolean']['output']>;
  archivePurchase?: Maybe<Scalars['Boolean']['output']>;
  archiveSale?: Maybe<Scalars['Boolean']['output']>;
  archiveServiceByBusiness?: Maybe<Scalars['Boolean']['output']>;
  archiveServiceUnit?: Maybe<Scalars['Boolean']['output']>;
  archiveSettlementAccount?: Maybe<Scalars['Boolean']['output']>;
  authenticate?: Maybe<TwoFactorLoginResponse>;
  authorizeChargeCard?: Maybe<Scalars['String']['output']>;
  changeBusinessEmail?: Maybe<Business>;
  changeBusinessMobile?: Maybe<Business>;
  changeBusinessName?: Maybe<Business>;
  changePassword?: Maybe<Scalars['Boolean']['output']>;
  changeSubscriptionPlanAndAddOn?: Maybe<Scalars['Boolean']['output']>;
  changeUserEmail?: Maybe<User>;
  changeUserFullname?: Maybe<User>;
  chargeCard?: Maybe<Scalars['Boolean']['output']>;
  createAccountCategory?: Maybe<AccountCategory>;
  createAccountCategoryType?: Maybe<AccountCategoryType>;
  createAddOnOption?: Maybe<AddOnOption>;
  createAdmin?: Maybe<Scalars['Boolean']['output']>;
  createBillingPlan: BillingPlan;
  createBusiness?: Maybe<Business>;
  createBusinessCOA?: Maybe<BusinessChartOfAccount>;
  createBusinessCategory?: Maybe<BusinessCategory>;
  createBusinessForTestingPlan?: Maybe<Business>;
  createBusinessProductUnit?: Maybe<BusinessProductUnit>;
  createBusinessServiceUnit?: Maybe<BusinessServiceUnit>;
  createCategory?: Maybe<Category>;
  createChartOfAccount?: Maybe<ChartOfAccount>;
  createCompleteInvoice?: Maybe<Invoice>;
  createCompleteInvoiceB?: Maybe<Invoice>;
  createCompletedExpenseWithCsv?: Maybe<Scalars['Boolean']['output']>;
  createCompletedPurchaseWithCsv?: Maybe<Scalars['Boolean']['output']>;
  createCompletedSalesWithCsv?: Maybe<Scalars['Boolean']['output']>;
  createCustomer?: Maybe<Customer>;
  createCustomerWithCsv?: Maybe<Scalars['Boolean']['output']>;
  createExpense?: Maybe<Expense>;
  createExpenseCategory?: Maybe<ExpenseCategory>;
  createExpenseWithCsv?: Maybe<Scalars['Boolean']['output']>;
  createInvite?: Maybe<Invite>;
  createInvoice?: Maybe<Invoice>;
  createMerchant?: Maybe<Merchant>;
  createMerchantInvoice?: Maybe<ExpenseMerchantInvoice>;
  createMerchantWithCsv?: Maybe<Scalars['Boolean']['output']>;
  createOffer?: Maybe<Offer>;
  createOption?: Maybe<Option>;
  createOptionIncluded?: Maybe<OptionIncluded>;
  createPayment?: Maybe<Payment>;
  createPlan?: Maybe<Plan>;
  createProduct: Product;
  createProductInvoiceDetail?: Maybe<ProductInvoiceDetail>;
  createProductSaleItem?: Maybe<ProductSaleItem>;
  createProductUnit?: Maybe<ProductUnit>;
  createProductsWithCsv?: Maybe<Scalars['Boolean']['output']>;
  createPurchaseEntry?: Maybe<Purchase>;
  createPurchasesWithCsv?: Maybe<Scalars['Boolean']['output']>;
  createRole: Role;
  createSale?: Maybe<Sale>;
  createSaleEntry?: Maybe<Sale>;
  createSaleWithCsv?: Maybe<Scalars['Boolean']['output']>;
  createService?: Maybe<Service>;
  createServiceInvoiceDetail?: Maybe<ServiceInvoiceDetail>;
  createServiceSaleItem?: Maybe<ServiceSaleItem>;
  createServiceUnit?: Maybe<ServiceUnit>;
  createServicesWithCsv?: Maybe<Scalars['Boolean']['output']>;
  createSettlementAccount?: Maybe<SettlementAccount>;
  createSubscription?: Maybe<Subscription>;
  createSubscriptionNewCardA?: Maybe<SeerbitStandardCheckoutResponse>;
  createSubscriptionNewCardB?: Maybe<Subscription>;
  createSubscriptionTokenized?: Maybe<Subscription>;
  createUserInvite?: Maybe<UserInvite>;
  deleteAccountCategory?: Maybe<Scalars['Boolean']['output']>;
  deleteAccountCategoryType?: Maybe<Scalars['Boolean']['output']>;
  deleteAddOnOption?: Maybe<Scalars['Boolean']['output']>;
  deleteAllBusinesses?: Maybe<Scalars['Boolean']['output']>;
  deleteAllCards?: Maybe<Scalars['Boolean']['output']>;
  deleteAllCustomers?: Maybe<Scalars['Boolean']['output']>;
  deleteAllEmployees?: Maybe<Scalars['Boolean']['output']>;
  deleteAllExpenseCategories?: Maybe<Scalars['Boolean']['output']>;
  deleteAllExpenseStatus?: Maybe<Scalars['Boolean']['output']>;
  deleteAllExpenses?: Maybe<Scalars['Boolean']['output']>;
  deleteAllExpensesByBusiness?: Maybe<Scalars['Boolean']['output']>;
  deleteAllInvoices?: Maybe<Scalars['Boolean']['output']>;
  deleteAllMerchants?: Maybe<Scalars['Boolean']['output']>;
  deleteAllOPtions?: Maybe<Scalars['Boolean']['output']>;
  deleteAllPaidSubscriptions?: Maybe<Scalars['Boolean']['output']>;
  deleteAllPlans?: Maybe<Scalars['Boolean']['output']>;
  deleteAllProductUnits?: Maybe<Scalars['Boolean']['output']>;
  deleteAllProducts?: Maybe<Scalars['Boolean']['output']>;
  deleteAllPurchaseStatus?: Maybe<Scalars['Boolean']['output']>;
  deleteAllPurchases?: Maybe<Scalars['Boolean']['output']>;
  deleteAllSaleStatus?: Maybe<Scalars['Boolean']['output']>;
  deleteAllSales?: Maybe<Scalars['Boolean']['output']>;
  deleteAllServiceUnits?: Maybe<Scalars['Boolean']['output']>;
  deleteAllServices?: Maybe<Scalars['Boolean']['output']>;
  deleteAllSubscriptions?: Maybe<Scalars['Boolean']['output']>;
  deleteBillingPlan?: Maybe<BillingPlan>;
  deleteBusiness?: Maybe<Scalars['Boolean']['output']>;
  deleteBusinessCOA?: Maybe<Scalars['Boolean']['output']>;
  deleteBusinessCategory?: Maybe<Scalars['Boolean']['output']>;
  deleteCategory?: Maybe<Scalars['Boolean']['output']>;
  deleteChartOfAccount?: Maybe<Scalars['Boolean']['output']>;
  deleteCustomer?: Maybe<Scalars['Boolean']['output']>;
  deleteEmployee?: Maybe<Scalars['Boolean']['output']>;
  deleteExpense?: Maybe<Scalars['Boolean']['output']>;
  deleteExpenseCategory?: Maybe<Scalars['Boolean']['output']>;
  deleteForgotPasswordEntries?: Maybe<Scalars['Boolean']['output']>;
  deleteForgotPasswordEntry?: Maybe<Scalars['Boolean']['output']>;
  deleteInviteById?: Maybe<Scalars['Boolean']['output']>;
  deleteInvoice?: Maybe<Scalars['Boolean']['output']>;
  deleteLogo?: Maybe<Scalars['Boolean']['output']>;
  deleteMerchant?: Maybe<Scalars['Boolean']['output']>;
  deleteOffer?: Maybe<Offer>;
  deleteOption?: Maybe<Scalars['Boolean']['output']>;
  deleteOptionIncluded?: Maybe<OptionIncluded>;
  deletePayment?: Maybe<Scalars['Boolean']['output']>;
  deletePlan?: Maybe<Scalars['Boolean']['output']>;
  deleteProduct?: Maybe<Scalars['Boolean']['output']>;
  deleteProductInvoiceDetail?: Maybe<Scalars['Boolean']['output']>;
  deleteProductSaleItem?: Maybe<Scalars['Boolean']['output']>;
  deleteProductUnit?: Maybe<Scalars['Boolean']['output']>;
  deletePurchase?: Maybe<Scalars['Boolean']['output']>;
  deleteRole?: Maybe<Scalars['Boolean']['output']>;
  deleteRoleByName?: Maybe<Scalars['Boolean']['output']>;
  deleteRoleByNameSuper?: Maybe<Scalars['Boolean']['output']>;
  deleteSale?: Maybe<Scalars['Boolean']['output']>;
  deleteService?: Maybe<Scalars['Boolean']['output']>;
  deleteServiceInvoiceDetail?: Maybe<Scalars['Boolean']['output']>;
  deleteServiceSaleItem?: Maybe<Scalars['Boolean']['output']>;
  deleteServiceUnit?: Maybe<Scalars['Boolean']['output']>;
  deleteSettlementAccount?: Maybe<Scalars['Boolean']['output']>;
  deleteSubscription?: Maybe<Scalars['Boolean']['output']>;
  deleteUser?: Maybe<Scalars['Boolean']['output']>;
  deleteUserById?: Maybe<Scalars['Boolean']['output']>;
  deleteUserFromWaitlist?: Maybe<Scalars['Boolean']['output']>;
  deleteUserFromWaitlistById?: Maybe<Scalars['Boolean']['output']>;
  deleteUserInvite?: Maybe<Scalars['Boolean']['output']>;
  effectSaleExpense: EffectSaleExpenseResponse;
  employeeChangePassword?: Maybe<Scalars['Boolean']['output']>;
  employeeForgotPassword?: Maybe<Scalars['Boolean']['output']>;
  employeeLogout?: Maybe<Scalars['Boolean']['output']>;
  employeeRefreshToken: EmployeeToken;
  employeeSignUp: Token;
  employeeSignUpAfterInvite: Token;
  employeeSignin: EmployeeToken;
  endSubscription?: Maybe<Subscription>;
  forgotPassword?: Maybe<Scalars['Boolean']['output']>;
  generateQrCodeDataURL?: Maybe<Scalars['String']['output']>;
  generateTwoFactorAuthSecret?: Maybe<TwoFactorAuthResponse>;
  logOut?: Maybe<Scalars['Boolean']['output']>;
  makeExpensePayment: MakePaymentForExpenseResponse;
  makePurchasePayment: MakePurchasePaymentResponse;
  makeSalePayment: MakeSalePaymentResponse;
  markExpenseAsNotRecurring?: Maybe<Scalars['Boolean']['output']>;
  markExpenseAsRecurring?: Maybe<Scalars['Boolean']['output']>;
  markExpenseItemAsReceived: MarkExpenseAsReceivedResponse;
  markPurchaseItemAsReceived: MarkPurchaseItemAsReceivedResponse;
  markSaleAsDelivered: MarkSaleAsDeliveredResponse;
  refreshToken: Token;
  resendVerification?: Maybe<Scalars['Boolean']['output']>;
  resetPassword?: Maybe<Scalars['Boolean']['output']>;
  sendInvoice?: Maybe<Scalars['Boolean']['output']>;
  sendInvoiceB?: Maybe<Scalars['Boolean']['output']>;
  sendPurchase?: Maybe<Scalars['Boolean']['output']>;
  setCardAsDefault?: Maybe<Scalars['Boolean']['output']>;
  signIn: TokenWithVerificationStatus;
  signInWithGoogle: Token;
  signUp: Token;
  signupFromWaitlist: Token;
  signupWithGoogle: Token;
  skipEffectSaleExpense: EffectSaleExpenseResponse;
  testPdf?: Maybe<Scalars['Boolean']['output']>;
  testPdfConverter?: Maybe<Scalars['Boolean']['output']>;
  tokenizedCharge?: Maybe<Scalars['Boolean']['output']>;
  turnOnTwoFactorAuth?: Maybe<Scalars['Boolean']['output']>;
  updateAccountCategory?: Maybe<AccountCategory>;
  updateAccountCategoryType?: Maybe<AccountCategoryType>;
  updateAddOnOption?: Maybe<AddOnOption>;
  updateBillingPlan?: Maybe<BillingPlan>;
  updateBusiness?: Maybe<Business>;
  updateBusinessCOA?: Maybe<BusinessChartOfAccount>;
  updateBusinessCategory?: Maybe<BusinessCategory>;
  updateBusinessProductUnit?: Maybe<BusinessProductUnit>;
  updateBusinessServiceUnit?: Maybe<BusinessServiceUnit>;
  updateCategory?: Maybe<Category>;
  updateChartOfAccount?: Maybe<ChartOfAccount>;
  updateCompleteInvoiceB?: Maybe<Invoice>;
  updateCustomer?: Maybe<Customer>;
  updateExpense?: Maybe<Expense>;
  updateExpenseCategory?: Maybe<ExpenseCategory>;
  updateInvite?: Maybe<Invite>;
  updateInvoice?: Maybe<Invoice>;
  updateMerchant?: Maybe<Merchant>;
  updateOffer?: Maybe<Offer>;
  updateOption?: Maybe<Option>;
  updateOptionIncluded?: Maybe<OptionIncluded>;
  updatePayment?: Maybe<Payment>;
  updatePlan?: Maybe<Plan>;
  updateProduct?: Maybe<Product>;
  updateProductInvoiceDetail?: Maybe<ProductInvoiceDetail>;
  updateProductSaleItem?: Maybe<ProductSaleItem>;
  updateProductUnit?: Maybe<ProductUnit>;
  updatePurchaseEntry?: Maybe<Purchase>;
  updateRole?: Maybe<Role>;
  updateSale?: Maybe<Sale>;
  updateSaleEntry?: Maybe<Sale>;
  updateService?: Maybe<Service>;
  updateServiceInvoiceDetail?: Maybe<ServiceInvoiceDetail>;
  updateServiceSaleItem?: Maybe<ServiceSaleItem>;
  updateServiceUnit?: Maybe<ServiceUnit>;
  updateSettlementAccount?: Maybe<SettlementAccount>;
  updateUser?: Maybe<User>;
  updateUserInWaitlist?: Maybe<UserWaitlist>;
  uploadBusinessLogo?: Maybe<Scalars['Boolean']['output']>;
  uploadFile?: Maybe<Scalars['Boolean']['output']>;
  uploadMerchantInvoiceToExpense: UploadMerchantInvoiceToExpenseResponse;
  uploadMerchantInvoiceToPurchase: UploadMerchantInvoiceToPurchaseResponse;
  userDeleteUser?: Maybe<Scalars['Boolean']['output']>;
  userSignUpAfterInvite: Token;
  validateCharge?: Maybe<Scalars['Boolean']['output']>;
  verification?: Maybe<Scalars['Boolean']['output']>;
  verificationWithEmailLink?: Maybe<Scalars['Boolean']['output']>;
};


export type MutationAddInvoiceCustomerArgs = {
  input: AddInvoiceCustomer;
  invoiceId: Scalars['String']['input'];
  userId?: InputMaybe<Scalars['String']['input']>;
};


export type MutationAddMerchantInvoiceToPurchaseArgs = {
  input?: InputMaybe<MerchantInvoiceToPurchase>;
};


export type MutationAddUserToWaitlistArgs = {
  input: AddWaitlist;
};


export type MutationAdminResetPasswordArgs = {
  employeeId?: InputMaybe<Scalars['String']['input']>;
  input: ResetPassword;
};


export type MutationArchiveAccountCategoryArgs = {
  accountCategoryId: Scalars['String']['input'];
};


export type MutationArchiveBusinessCoaArgs = {
  businessCoaId: Scalars['String']['input'];
};


export type MutationArchiveCardArgs = {
  cardId: Scalars['String']['input'];
};


export type MutationArchiveCustomerByBusinessArgs = {
  customerId: Scalars['String']['input'];
  userId?: InputMaybe<Scalars['String']['input']>;
};


export type MutationArchiveExpenseArgs = {
  expenseId: Scalars['String']['input'];
};


export type MutationArchiveInvoiceArgs = {
  invoiceId: Scalars['String']['input'];
};


export type MutationArchiveMerchantArgs = {
  merchantId: Scalars['String']['input'];
};


export type MutationArchiveProductByBusinessArgs = {
  productId: Scalars['String']['input'];
  userId?: InputMaybe<Scalars['String']['input']>;
};


export type MutationArchiveProductUnitArgs = {
  productUnitId: Scalars['String']['input'];
};


export type MutationArchivePurchaseArgs = {
  purchaseId: Scalars['String']['input'];
};


export type MutationArchiveSaleArgs = {
  saleId: Scalars['String']['input'];
};


export type MutationArchiveServiceByBusinessArgs = {
  serviceId: Scalars['String']['input'];
  userId?: InputMaybe<Scalars['String']['input']>;
};


export type MutationArchiveServiceUnitArgs = {
  serviceUnitId: Scalars['String']['input'];
};


export type MutationArchiveSettlementAccountArgs = {
  accountId: Scalars['String']['input'];
};


export type MutationAuthenticateArgs = {
  employeeId?: InputMaybe<Scalars['String']['input']>;
  twoFactorAuthCode: Scalars['String']['input'];
};


export type MutationAuthorizeChargeCardArgs = {
  input: CardDetailsB;
};


export type MutationChangeBusinessEmailArgs = {
  businessId: Scalars['String']['input'];
  newBusinessEmail: Scalars['String']['input'];
};


export type MutationChangeBusinessMobileArgs = {
  businessId: Scalars['String']['input'];
  newBusinessMobile: Scalars['String']['input'];
};


export type MutationChangeBusinessNameArgs = {
  businessId: Scalars['String']['input'];
  newBusinessName: Scalars['String']['input'];
};


export type MutationChangePasswordArgs = {
  forgotPasswordId: Scalars['String']['input'];
  input: ChangePassword;
};


export type MutationChangeSubscriptionPlanAndAddOnArgs = {
  input?: InputMaybe<ChangePlanAndAddOn>;
};


export type MutationChangeUserEmailArgs = {
  newEmail: Scalars['String']['input'];
};


export type MutationChangeUserFullnameArgs = {
  newFullname: Scalars['String']['input'];
};


export type MutationChargeCardArgs = {
  input: CardDetails;
};


export type MutationCreateAccountCategoryArgs = {
  input: CreateAccountCategory;
};


export type MutationCreateAccountCategoryTypeArgs = {
  input: CreateAccountCategoryType;
};


export type MutationCreateAddOnOptionArgs = {
  input: CreateAddOnOption;
};


export type MutationCreateAdminArgs = {
  employeeId?: InputMaybe<Scalars['String']['input']>;
  input: SignUpDetails;
};


export type MutationCreateBillingPlanArgs = {
  input: CreateBillingPlan;
};


export type MutationCreateBusinessArgs = {
  input: CreateBusiness;
  userId?: InputMaybe<Scalars['String']['input']>;
};


export type MutationCreateBusinessCoaArgs = {
  input: CreateBusinessCoa;
};


export type MutationCreateBusinessCategoryArgs = {
  input: CreateBusinessCategory;
};


export type MutationCreateBusinessForTestingPlanArgs = {
  input: CreateBusinessForTesting;
};


export type MutationCreateBusinessProductUnitArgs = {
  input: CreateBusinessProductUnit;
};


export type MutationCreateBusinessServiceUnitArgs = {
  input: CreateBusinessServiceUnit;
};


export type MutationCreateCategoryArgs = {
  input: CreateCategory;
  userId?: InputMaybe<Scalars['String']['input']>;
};


export type MutationCreateChartOfAccountArgs = {
  input: CreateChartOfAccount;
};


export type MutationCreateCompleteInvoiceArgs = {
  input: CreateCompleteInvoice;
  userId?: InputMaybe<Scalars['String']['input']>;
};


export type MutationCreateCompleteInvoiceBArgs = {
  input: CreateCompleteInvoiceB;
};


export type MutationCreateCompletedExpenseWithCsvArgs = {
  businessId: Scalars['String']['input'];
  csvFile: Scalars['Any']['input'];
};


export type MutationCreateCompletedPurchaseWithCsvArgs = {
  businessId: Scalars['String']['input'];
  csvFile: Scalars['Any']['input'];
};


export type MutationCreateCompletedSalesWithCsvArgs = {
  businessId: Scalars['String']['input'];
  csvFile: Scalars['Any']['input'];
};


export type MutationCreateCustomerArgs = {
  input: CreateCustomer;
  userId?: InputMaybe<Scalars['String']['input']>;
};


export type MutationCreateCustomerWithCsvArgs = {
  businessId: Scalars['String']['input'];
  csvFile: Scalars['Any']['input'];
};


export type MutationCreateExpenseArgs = {
  input: CreateExpense;
};


export type MutationCreateExpenseCategoryArgs = {
  input: CreateExpenseCategory;
};


export type MutationCreateExpenseWithCsvArgs = {
  businessId: Scalars['String']['input'];
  csvFile: Scalars['Any']['input'];
};


export type MutationCreateInviteArgs = {
  employeeId?: InputMaybe<Scalars['String']['input']>;
  input: CreateInvite;
};


export type MutationCreateInvoiceArgs = {
  input: CreateInvoice;
  userId?: InputMaybe<Scalars['String']['input']>;
};


export type MutationCreateMerchantArgs = {
  input: CreateMerchant;
};


export type MutationCreateMerchantInvoiceArgs = {
  input?: InputMaybe<CreateMerchantInvoice>;
};


export type MutationCreateMerchantWithCsvArgs = {
  businessId: Scalars['String']['input'];
  csvFile: Scalars['Any']['input'];
};


export type MutationCreateOfferArgs = {
  input: CreateOffer;
};


export type MutationCreateOptionArgs = {
  input: CreateOption;
};


export type MutationCreateOptionIncludedArgs = {
  input: CreateOptionIncluded;
};


export type MutationCreatePaymentArgs = {
  input: CreatePayment;
  userId?: InputMaybe<Scalars['String']['input']>;
};


export type MutationCreatePlanArgs = {
  input: CreatePlan;
};


export type MutationCreateProductArgs = {
  input: CreateProduct;
  userId?: InputMaybe<Scalars['String']['input']>;
};


export type MutationCreateProductInvoiceDetailArgs = {
  input: CreateProductInvoiceDetail;
  userId?: InputMaybe<Scalars['String']['input']>;
};


export type MutationCreateProductSaleItemArgs = {
  input?: InputMaybe<CreateProductSaleItem>;
  userId?: InputMaybe<Scalars['String']['input']>;
};


export type MutationCreateProductUnitArgs = {
  input: CreateProductUnit;
};


export type MutationCreateProductsWithCsvArgs = {
  businessId: Scalars['String']['input'];
  csvFile: Scalars['Any']['input'];
};


export type MutationCreatePurchaseEntryArgs = {
  input: CreatePurchase;
};


export type MutationCreatePurchasesWithCsvArgs = {
  businessId: Scalars['String']['input'];
  csvFile: Scalars['Any']['input'];
};


export type MutationCreateRoleArgs = {
  input: CreateRole;
};


export type MutationCreateSaleArgs = {
  input: CreateSale;
  userId?: InputMaybe<Scalars['String']['input']>;
};


export type MutationCreateSaleEntryArgs = {
  input: CreateSaleEntry;
};


export type MutationCreateSaleWithCsvArgs = {
  businessId: Scalars['String']['input'];
  csvFile: Scalars['Any']['input'];
};


export type MutationCreateServiceArgs = {
  input: CreateService;
  userId?: InputMaybe<Scalars['String']['input']>;
};


export type MutationCreateServiceInvoiceDetailArgs = {
  input: CreateServiceInvoiceDetail;
  userId?: InputMaybe<Scalars['String']['input']>;
};


export type MutationCreateServiceSaleItemArgs = {
  input?: InputMaybe<CreateServiceSaleItem>;
  userId?: InputMaybe<Scalars['String']['input']>;
};


export type MutationCreateServiceUnitArgs = {
  input?: InputMaybe<CreateServiceUnit>;
};


export type MutationCreateServicesWithCsvArgs = {
  businessId: Scalars['String']['input'];
  csvFile: Scalars['Any']['input'];
};


export type MutationCreateSettlementAccountArgs = {
  input: CreateSettlementAccount;
};


export type MutationCreateSubscriptionArgs = {
  input: CreateSubscription;
  userId?: InputMaybe<Scalars['String']['input']>;
};


export type MutationCreateSubscriptionNewCardAArgs = {
  input: CreateSubscription;
};


export type MutationCreateSubscriptionNewCardBArgs = {
  input: CreateSubscriptionAfterPayment;
  seerbitRef: Scalars['String']['input'];
};


export type MutationCreateSubscriptionTokenizedArgs = {
  input: CreateSubscriptionTokenizedInput;
};


export type MutationCreateUserInviteArgs = {
  input: CreateUserInvite;
};


export type MutationDeleteAccountCategoryArgs = {
  accountCategoryId: Scalars['String']['input'];
};


export type MutationDeleteAccountCategoryTypeArgs = {
  accountCategoryTypeId: Scalars['String']['input'];
};


export type MutationDeleteAddOnOptionArgs = {
  addOnOptionId: Scalars['String']['input'];
};


export type MutationDeleteAllExpensesByBusinessArgs = {
  businessId: Scalars['String']['input'];
};


export type MutationDeleteBillingPlanArgs = {
  billingPlanId: Scalars['String']['input'];
};


export type MutationDeleteBusinessArgs = {
  businessId: Scalars['String']['input'];
  userId?: InputMaybe<Scalars['String']['input']>;
};


export type MutationDeleteBusinessCoaArgs = {
  businessCoaId: Scalars['String']['input'];
};


export type MutationDeleteBusinessCategoryArgs = {
  businessCategoryId: Scalars['String']['input'];
  employeeId?: InputMaybe<Scalars['String']['input']>;
};


export type MutationDeleteCategoryArgs = {
  categoryId: Scalars['String']['input'];
  userId?: InputMaybe<Scalars['String']['input']>;
};


export type MutationDeleteChartOfAccountArgs = {
  coaId: Scalars['String']['input'];
};


export type MutationDeleteCustomerArgs = {
  customerId: Scalars['String']['input'];
  userId?: InputMaybe<Scalars['String']['input']>;
};


export type MutationDeleteEmployeeArgs = {
  deleteEmployeeId: Scalars['String']['input'];
  email: Scalars['String']['input'];
};


export type MutationDeleteExpenseArgs = {
  expenseId: Scalars['String']['input'];
};


export type MutationDeleteExpenseCategoryArgs = {
  expenseCategoryId: Scalars['String']['input'];
};


export type MutationDeleteForgotPasswordEntryArgs = {
  forgotPasswordId: Scalars['String']['input'];
};


export type MutationDeleteInviteByIdArgs = {
  employeeId?: InputMaybe<Scalars['String']['input']>;
  inviteId: Scalars['String']['input'];
};


export type MutationDeleteInvoiceArgs = {
  invoiceId: Scalars['String']['input'];
  userId?: InputMaybe<Scalars['String']['input']>;
};


export type MutationDeleteLogoArgs = {
  file: Scalars['String']['input'];
};


export type MutationDeleteMerchantArgs = {
  merchantId: Scalars['String']['input'];
};


export type MutationDeleteOfferArgs = {
  offerId: Scalars['String']['input'];
};


export type MutationDeleteOptionArgs = {
  optionId: Scalars['String']['input'];
};


export type MutationDeleteOptionIncludedArgs = {
  optionIncludedId: Scalars['String']['input'];
};


export type MutationDeletePaymentArgs = {
  paymentId: Scalars['String']['input'];
  userId?: InputMaybe<Scalars['String']['input']>;
};


export type MutationDeletePlanArgs = {
  planId: Scalars['String']['input'];
};


export type MutationDeleteProductArgs = {
  productId: Scalars['String']['input'];
  userId?: InputMaybe<Scalars['String']['input']>;
};


export type MutationDeleteProductInvoiceDetailArgs = {
  productInvoiceDetailId: Scalars['String']['input'];
  userId?: InputMaybe<Scalars['String']['input']>;
};


export type MutationDeleteProductSaleItemArgs = {
  productSaleItemId: Scalars['String']['input'];
};


export type MutationDeleteProductUnitArgs = {
  productUnitId: Scalars['String']['input'];
};


export type MutationDeletePurchaseArgs = {
  purchaseId: Scalars['String']['input'];
};


export type MutationDeleteRoleArgs = {
  roleId: Scalars['String']['input'];
};


export type MutationDeleteRoleByNameArgs = {
  roleName: Scalars['String']['input'];
};


export type MutationDeleteRoleByNameSuperArgs = {
  roleName: Scalars['String']['input'];
};


export type MutationDeleteSaleArgs = {
  saleId: Scalars['String']['input'];
};


export type MutationDeleteServiceArgs = {
  serviceId: Scalars['String']['input'];
  userId?: InputMaybe<Scalars['String']['input']>;
};


export type MutationDeleteServiceInvoiceDetailArgs = {
  serviceInvoiceDetailId: Scalars['String']['input'];
  userId?: InputMaybe<Scalars['String']['input']>;
};


export type MutationDeleteServiceSaleItemArgs = {
  serviceSaleItemId: Scalars['String']['input'];
};


export type MutationDeleteServiceUnitArgs = {
  serviceUnitId: Scalars['String']['input'];
};


export type MutationDeleteSettlementAccountArgs = {
  accountId: Scalars['String']['input'];
};


export type MutationDeleteSubscriptionArgs = {
  subscriptionId: Scalars['String']['input'];
};


export type MutationDeleteUserArgs = {
  email: Scalars['String']['input'];
};


export type MutationDeleteUserByIdArgs = {
  userId: Scalars['String']['input'];
};


export type MutationDeleteUserFromWaitlistArgs = {
  email: Scalars['String']['input'];
};


export type MutationDeleteUserFromWaitlistByIdArgs = {
  waitlistId: Scalars['String']['input'];
};


export type MutationDeleteUserInviteArgs = {
  businessId: Scalars['String']['input'];
  inviteId: Scalars['String']['input'];
};


export type MutationEffectSaleExpenseArgs = {
  input: EffectSaleExpense;
};


export type MutationEmployeeChangePasswordArgs = {
  forgotPasswordId: Scalars['String']['input'];
  input: ChangePassword;
};


export type MutationEmployeeForgotPasswordArgs = {
  email: Scalars['String']['input'];
};


export type MutationEmployeeLogoutArgs = {
  employeeId?: InputMaybe<Scalars['String']['input']>;
};


export type MutationEmployeeRefreshTokenArgs = {
  employeeId?: InputMaybe<Scalars['String']['input']>;
  rt?: InputMaybe<Scalars['String']['input']>;
};


export type MutationEmployeeSignUpArgs = {
  input: SignUpDetails;
};


export type MutationEmployeeSignUpAfterInviteArgs = {
  inviteId: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationEmployeeSigninArgs = {
  input: EmployeeSignInDetails;
};


export type MutationEndSubscriptionArgs = {
  subscriptionId: Scalars['String']['input'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String']['input'];
};


export type MutationGenerateQrCodeDataUrlArgs = {
  otpAuthUrl: Scalars['String']['input'];
};


export type MutationGenerateTwoFactorAuthSecretArgs = {
  employeeId?: InputMaybe<Scalars['String']['input']>;
};


export type MutationLogOutArgs = {
  userId?: InputMaybe<Scalars['String']['input']>;
};


export type MutationMakeExpensePaymentArgs = {
  input?: InputMaybe<ExpensePaymentEntry>;
};


export type MutationMakePurchasePaymentArgs = {
  input?: InputMaybe<PurchasePaymentEntry>;
};


export type MutationMakeSalePaymentArgs = {
  input: MakeSalePayment;
};


export type MutationMarkExpenseAsNotRecurringArgs = {
  expenseId: Scalars['String']['input'];
  userId?: InputMaybe<Scalars['String']['input']>;
};


export type MutationMarkExpenseAsRecurringArgs = {
  expenseId: Scalars['String']['input'];
  userId?: InputMaybe<Scalars['String']['input']>;
};


export type MutationMarkExpenseItemAsReceivedArgs = {
  input: ExpenseItemReceived;
};


export type MutationMarkPurchaseItemAsReceivedArgs = {
  input: PurchaseItemReceived;
};


export type MutationMarkSaleAsDeliveredArgs = {
  saleId: Scalars['String']['input'];
};


export type MutationRefreshTokenArgs = {
  rt?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['String']['input']>;
};


export type MutationResendVerificationArgs = {
  userId?: InputMaybe<Scalars['String']['input']>;
};


export type MutationResetPasswordArgs = {
  input: ResetPassword;
  userId?: InputMaybe<Scalars['String']['input']>;
};


export type MutationSendInvoiceArgs = {
  fileData: Scalars['Any']['input'];
  invoiceId: Scalars['String']['input'];
};


export type MutationSendInvoiceBArgs = {
  copy?: InputMaybe<Scalars['Boolean']['input']>;
  invoiceId: Scalars['String']['input'];
};


export type MutationSendPurchaseArgs = {
  copy?: InputMaybe<Scalars['Boolean']['input']>;
  purchaseId: Scalars['String']['input'];
};


export type MutationSetCardAsDefaultArgs = {
  businessId: Scalars['String']['input'];
  cardId: Scalars['String']['input'];
};


export type MutationSignInArgs = {
  input: SignInDetails;
};


export type MutationSignInWithGoogleArgs = {
  idToken: Scalars['String']['input'];
};


export type MutationSignUpArgs = {
  input: SignUpDetails;
};


export type MutationSignupFromWaitlistArgs = {
  password: Scalars['String']['input'];
  waitlistId: Scalars['String']['input'];
};


export type MutationSignupWithGoogleArgs = {
  idToken: Scalars['String']['input'];
};


export type MutationSkipEffectSaleExpenseArgs = {
  saleId: Scalars['String']['input'];
};


export type MutationTestPdfArgs = {
  content: Scalars['String']['input'];
  filename: Scalars['String']['input'];
};


export type MutationTokenizedChargeArgs = {
  input: TokenizedDetails;
};


export type MutationTurnOnTwoFactorAuthArgs = {
  employeeId?: InputMaybe<Scalars['String']['input']>;
  twoFactorAuthCode: Scalars['String']['input'];
};


export type MutationUpdateAccountCategoryArgs = {
  accountCategoryId: Scalars['String']['input'];
  input?: InputMaybe<UpdateAccountCategory>;
};


export type MutationUpdateAccountCategoryTypeArgs = {
  accountCategoryTypeId: Scalars['String']['input'];
  input?: InputMaybe<UpdateAccountCategoryType>;
};


export type MutationUpdateAddOnOptionArgs = {
  addOnOptionId: Scalars['String']['input'];
  input?: InputMaybe<UpdateAddOnOption>;
};


export type MutationUpdateBillingPlanArgs = {
  billingPlanId: Scalars['String']['input'];
  input?: InputMaybe<UpdateBillingPlan>;
};


export type MutationUpdateBusinessArgs = {
  businessId: Scalars['String']['input'];
  input?: InputMaybe<UpdateBusiness>;
  userId?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdateBusinessCoaArgs = {
  businessCoaId: Scalars['String']['input'];
  input?: InputMaybe<UpdateBusinessCoa>;
};


export type MutationUpdateBusinessCategoryArgs = {
  businessCategoryId: Scalars['String']['input'];
  input?: InputMaybe<UpdateBusinessCategory>;
};


export type MutationUpdateBusinessProductUnitArgs = {
  businessId: Scalars['String']['input'];
  input?: InputMaybe<UpdateBusinessProductUnit>;
};


export type MutationUpdateBusinessServiceUnitArgs = {
  businessId: Scalars['String']['input'];
  input?: InputMaybe<UpdateBusinessServiceUnit>;
};


export type MutationUpdateCategoryArgs = {
  categoryId: Scalars['String']['input'];
  input?: InputMaybe<UpdateCategory>;
  userId?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdateChartOfAccountArgs = {
  coaId: Scalars['String']['input'];
  input?: InputMaybe<UpdateChartOfAccount>;
};


export type MutationUpdateCompleteInvoiceBArgs = {
  input: UpdateCompleteInvoiceB;
  invoiceId: Scalars['String']['input'];
};


export type MutationUpdateCustomerArgs = {
  customerId: Scalars['String']['input'];
  input?: InputMaybe<UpdateCustomer>;
  userId?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdateExpenseArgs = {
  expenseId: Scalars['String']['input'];
  input?: InputMaybe<UpdateExpense>;
};


export type MutationUpdateExpenseCategoryArgs = {
  expenseCategoryId: Scalars['String']['input'];
  input?: InputMaybe<UpdateExpenseCategory>;
};


export type MutationUpdateInviteArgs = {
  employeeId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<UpdateInvite>;
  inviteId: Scalars['String']['input'];
};


export type MutationUpdateInvoiceArgs = {
  input?: InputMaybe<UpdateInvoice>;
  invoiceId: Scalars['String']['input'];
  userId?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdateMerchantArgs = {
  input?: InputMaybe<UpdateMerchant>;
  merchantId: Scalars['String']['input'];
  userId?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdateOfferArgs = {
  input?: InputMaybe<UpdateOffer>;
  offerId?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdateOptionArgs = {
  input?: InputMaybe<UpdateOption>;
  optionId: Scalars['String']['input'];
};


export type MutationUpdateOptionIncludedArgs = {
  input?: InputMaybe<UpdateOptionIncluded>;
  optionIncludedId: Scalars['String']['input'];
};


export type MutationUpdatePaymentArgs = {
  input?: InputMaybe<UpdatePayment>;
  paymentId: Scalars['String']['input'];
  userId?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdatePlanArgs = {
  input?: InputMaybe<UpdatePlan>;
  planId: Scalars['String']['input'];
};


export type MutationUpdateProductArgs = {
  input?: InputMaybe<UpdateProduct>;
  productId: Scalars['String']['input'];
  userId?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdateProductInvoiceDetailArgs = {
  input?: InputMaybe<UpdateProductInvoiceDetail>;
  productInvoiceDetailId: Scalars['String']['input'];
  userId?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdateProductSaleItemArgs = {
  input?: InputMaybe<UpdateProductSaleItem>;
  productSaleItemId: Scalars['String']['input'];
  userId?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdateProductUnitArgs = {
  input?: InputMaybe<UpdateProductUnit>;
  productUnitId: Scalars['String']['input'];
};


export type MutationUpdatePurchaseEntryArgs = {
  input: UpdatePurchase;
  purchaseId: Scalars['String']['input'];
};


export type MutationUpdateRoleArgs = {
  input?: InputMaybe<UpdateRole>;
  roleId: Scalars['String']['input'];
};


export type MutationUpdateSaleArgs = {
  input?: InputMaybe<UpdateSale>;
  saleId: Scalars['String']['input'];
};


export type MutationUpdateSaleEntryArgs = {
  input?: InputMaybe<UpdateSaleEntry>;
  saleId: Scalars['String']['input'];
};


export type MutationUpdateServiceArgs = {
  input?: InputMaybe<UpdateService>;
  serviceId: Scalars['String']['input'];
  userId?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdateServiceInvoiceDetailArgs = {
  input?: InputMaybe<UpdateServiceInvoiceDetail>;
  serviceInvoiceDetailId: Scalars['String']['input'];
  userId?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdateServiceSaleItemArgs = {
  input?: InputMaybe<UpdateServiceSaleItem>;
  serviceSaleItemId: Scalars['String']['input'];
  userId?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdateServiceUnitArgs = {
  input?: InputMaybe<UpdateServiceUnit>;
  serviceUnitId: Scalars['String']['input'];
};


export type MutationUpdateSettlementAccountArgs = {
  accountId: Scalars['String']['input'];
  input: UpdateSettlementAccount;
};


export type MutationUpdateUserArgs = {
  input?: InputMaybe<UpdateUser>;
};


export type MutationUpdateUserInWaitlistArgs = {
  input?: InputMaybe<UpdateWaitlist>;
  waitlistId: Scalars['String']['input'];
};


export type MutationUploadBusinessLogoArgs = {
  businessId: Scalars['String']['input'];
  image: Scalars['Any']['input'];
};


export type MutationUploadFileArgs = {
  image: Scalars['Any']['input'];
};


export type MutationUploadMerchantInvoiceToExpenseArgs = {
  input: UploadMerchantInvoice;
};


export type MutationUploadMerchantInvoiceToPurchaseArgs = {
  input: UploadMerchantInvoiceToPurchase;
};


export type MutationUserDeleteUserArgs = {
  businessId: Scalars['String']['input'];
  deleteUserId: Scalars['String']['input'];
};


export type MutationUserSignUpAfterInviteArgs = {
  inviteId: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationValidateChargeArgs = {
  flwRef: Scalars['String']['input'];
  otp: Scalars['String']['input'];
};


export type MutationVerificationArgs = {
  code: Scalars['Float']['input'];
};


export type MutationVerificationWithEmailLinkArgs = {
  userIdFromEmail: Scalars['String']['input'];
};

export type Offer = {
  __typename?: 'Offer';
  createdAt?: Maybe<Scalars['Date']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  discountAmount?: Maybe<Scalars['Float']['output']>;
  discountPercentage?: Maybe<Scalars['Int']['output']>;
  id: Scalars['String']['output'];
  offerEndDate?: Maybe<Scalars['Date']['output']>;
  offerName: Scalars['String']['output'];
  offerStartDate?: Maybe<Scalars['Date']['output']>;
};

export type Option = {
  __typename?: 'Option';
  createdAt: Scalars['Date']['output'];
  id: Scalars['String']['output'];
  optionName: Scalars['String']['output'];
  updatedAt: Scalars['Date']['output'];
};

export type OptionData = {
  id: Scalars['String']['input'];
  limit?: InputMaybe<Scalars['Float']['input']>;
};

export type OptionIncluded = {
  __typename?: 'OptionIncluded';
  createdAt: Scalars['Date']['output'];
  id: Scalars['String']['output'];
  option?: Maybe<Option>;
  optionId: Scalars['String']['output'];
  plan?: Maybe<Plan>;
  planId: Scalars['String']['output'];
};

export type Payment = {
  __typename?: 'Payment';
  amount: Scalars['Float']['output'];
  business?: Maybe<Business>;
  businessId: Scalars['String']['output'];
  createdAt: Scalars['Date']['output'];
  customer?: Maybe<Customer>;
  customerId: Scalars['String']['output'];
  dateReceived?: Maybe<Scalars['Date']['output']>;
  id: Scalars['String']['output'];
  invoice?: Maybe<Invoice>;
  invoiceId: Scalars['String']['output'];
  paymentMethod: Scalars['String']['output'];
  remarks?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['Date']['output'];
};

export type Plan = {
  __typename?: 'Plan';
  createdAt: Scalars['Date']['output'];
  currentPrice: Scalars['Float']['output'];
  id: Scalars['String']['output'];
  isActive?: Maybe<Scalars['Boolean']['output']>;
  optionIncluded?: Maybe<Array<Maybe<OptionIncluded>>>;
  planName: Scalars['String']['output'];
};

export type PlanHistory = {
  __typename?: 'PlanHistory';
  createdAt?: Maybe<Scalars['Date']['output']>;
  dateEnd?: Maybe<Scalars['Date']['output']>;
  dateStart?: Maybe<Scalars['Date']['output']>;
  plan: Plan;
  planId: Scalars['String']['output'];
  subscription?: Maybe<Subscription>;
  subscriptionId: Scalars['String']['output'];
};

export type Product = {
  __typename?: 'Product';
  business?: Maybe<Business>;
  businessId?: Maybe<Scalars['String']['output']>;
  businessProductUnit?: Maybe<BusinessProductUnit>;
  businessProductUnitId?: Maybe<Scalars['String']['output']>;
  category?: Maybe<Category>;
  categoryId?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['Date']['output']>;
  createdBy?: Maybe<User>;
  createdById?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  image?: Maybe<Scalars['String']['output']>;
  isArchived?: Maybe<Scalars['Boolean']['output']>;
  price?: Maybe<Scalars['Float']['output']>;
  productName: Scalars['String']['output'];
  productUnit?: Maybe<ProductUnit>;
  productUnitId?: Maybe<Scalars['String']['output']>;
  productsInventory?: Maybe<ProductInventory>;
  reorderLevel?: Maybe<Scalars['Float']['output']>;
  stockStatus?: Maybe<Scalars['String']['output']>;
  trackReorderLevel?: Maybe<Scalars['Boolean']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['Date']['output']>;
};

export type ProductDetail = {
  index?: InputMaybe<Scalars['Float']['input']>;
  price: Scalars['Float']['input'];
  productId: Scalars['String']['input'];
  quantity?: InputMaybe<Scalars['Float']['input']>;
};

export type ProductInventory = {
  __typename?: 'ProductInventory';
  business?: Maybe<Business>;
  businessId?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['Date']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  product?: Maybe<Product>;
  quantity?: Maybe<Scalars['Float']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['Date']['output']>;
};

export type ProductInvoiceDetail = {
  __typename?: 'ProductInvoiceDetail';
  archived?: Maybe<Scalars['Boolean']['output']>;
  createdAt?: Maybe<Scalars['Date']['output']>;
  discount?: Maybe<Scalars['Float']['output']>;
  id: Scalars['String']['output'];
  invoiceDetail?: Maybe<InvoiceDetail>;
  price: Scalars['Float']['output'];
  product?: Maybe<Product>;
  productId: Scalars['String']['output'];
  quantity: Scalars['Float']['output'];
  type: Scalars['String']['output'];
  unitPrice: Scalars['Float']['output'];
  updatedAt?: Maybe<Scalars['Date']['output']>;
};

export type ProductOrService = {
  __typename?: 'ProductOrService';
  business?: Maybe<Business>;
  businessId: Scalars['String']['output'];
  createdAt?: Maybe<Scalars['Date']['output']>;
  id: Scalars['String']['output'];
  isArchived?: Maybe<Scalars['Boolean']['output']>;
  price?: Maybe<Scalars['Float']['output']>;
  product?: Maybe<Product>;
  service?: Maybe<Service>;
  title: Scalars['String']['output'];
  type: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['Date']['output']>;
};

export type ProductSaleItem = {
  __typename?: 'ProductSaleItem';
  business?: Maybe<Business>;
  businessId: Scalars['String']['output'];
  createdAt?: Maybe<Scalars['Date']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  price: Scalars['Float']['output'];
  pricePerUnit: Scalars['Float']['output'];
  product?: Maybe<Product>;
  productId: Scalars['String']['output'];
  quantity: Scalars['Float']['output'];
  sale?: Maybe<Sale>;
  saleId: Scalars['String']['output'];
  tax?: Maybe<Scalars['Float']['output']>;
  updatedAt?: Maybe<Scalars['Date']['output']>;
};

export type ProductUnit = {
  __typename?: 'ProductUnit';
  createdAt?: Maybe<Scalars['Date']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  isArchived?: Maybe<Scalars['Boolean']['output']>;
  unitName?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['Date']['output']>;
};

export type ProfitObjectResponse = {
  __typename?: 'ProfitObjectResponse';
  expenseTotal: Scalars['Float']['output'];
  paymentTotal: Scalars['Float']['output'];
  profitLoss: Scalars['Float']['output'];
};

export type Purchase = {
  __typename?: 'Purchase';
  archived?: Maybe<Scalars['Boolean']['output']>;
  business?: Maybe<Business>;
  businessId?: Maybe<Scalars['String']['output']>;
  chartOfAccount?: Maybe<ChartOfAccount>;
  chartOfAccountId?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['Date']['output']>;
  createdBy?: Maybe<User>;
  createdById?: Maybe<Scalars['String']['output']>;
  deliveryDate?: Maybe<Scalars['Date']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  gRIRClearingAccount?: Maybe<GrirClearingAccount>;
  id?: Maybe<Scalars['String']['output']>;
  merchant?: Maybe<Merchant>;
  merchantId?: Maybe<Scalars['String']['output']>;
  paid?: Maybe<Scalars['Boolean']['output']>;
  paidAt?: Maybe<Scalars['Date']['output']>;
  purchaseItems?: Maybe<Array<Maybe<PurchaseItem>>>;
  purchaseLines?: Maybe<Array<Maybe<PurchaseLine>>>;
  purchasePayments?: Maybe<Array<Maybe<PurchasePayment>>>;
  purchaseStatus?: Maybe<PurchaseStatusRef>;
  purchaseStatusId?: Maybe<Scalars['Int']['output']>;
  reference?: Maybe<Scalars['String']['output']>;
  total?: Maybe<Scalars['Float']['output']>;
  transactionDate?: Maybe<Scalars['Date']['output']>;
  updatedAt?: Maybe<Scalars['Date']['output']>;
};

export type PurchaseItem = {
  __typename?: 'PurchaseItem';
  archived?: Maybe<Scalars['Boolean']['output']>;
  createdAt?: Maybe<Scalars['Date']['output']>;
  description: Scalars['String']['output'];
  id?: Maybe<Scalars['String']['output']>;
  index: Scalars['Float']['output'];
  price: Scalars['Float']['output'];
  priceOfReceived?: Maybe<Scalars['Float']['output']>;
  product?: Maybe<Product>;
  productId?: Maybe<Scalars['String']['output']>;
  productType?: Maybe<Scalars['String']['output']>;
  purchase?: Maybe<Purchase>;
  purchaseId: Scalars['String']['output'];
  quantity: Scalars['Float']['output'];
  quantityReceived?: Maybe<Scalars['Float']['output']>;
  received?: Maybe<Scalars['Boolean']['output']>;
  unitPrice: Scalars['Float']['output'];
  updatedAt?: Maybe<Scalars['Date']['output']>;
};

export type PurchaseItemDetail = {
  index: Scalars['Float']['input'];
  itemDescription: Scalars['String']['input'];
  productId: Scalars['String']['input'];
  quantity: Scalars['Float']['input'];
  unitPrice: Scalars['Float']['input'];
};

export type PurchaseItemReceived = {
  businessId: Scalars['String']['input'];
  purchaseItemId: Scalars['String']['input'];
  quantity: Scalars['Float']['input'];
  transactionDate: Scalars['Date']['input'];
};

export type PurchaseLine = {
  __typename?: 'PurchaseLine';
  business?: Maybe<Business>;
  businessId: Scalars['String']['output'];
  chartOfAccount?: Maybe<ChartOfAccount>;
  createdAt?: Maybe<Scalars['Date']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  lineAmount: Scalars['Float']['output'];
  lineChartOfAccountId: Scalars['String']['output'];
  lineQuantity?: Maybe<Scalars['Float']['output']>;
  product?: Maybe<Product>;
  productId?: Maybe<Scalars['String']['output']>;
  purchase?: Maybe<Purchase>;
  purchaseId: Scalars['String']['output'];
  transactionDate: Scalars['Date']['output'];
};

export type PurchaseMerchantInvoice = {
  __typename?: 'PurchaseMerchantInvoice';
  business?: Maybe<Business>;
  businessId?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['Date']['output']>;
  createdBy?: Maybe<User>;
  createdById?: Maybe<Scalars['String']['output']>;
  gRIRClearingAccount?: Maybe<GrirClearingAccount>;
  gRIRClearingAccountId?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  invoiceDate?: Maybe<Scalars['Date']['output']>;
  merchant?: Maybe<Merchant>;
  merchantId?: Maybe<Scalars['String']['output']>;
  merchantInvoiceItems?: Maybe<Array<Maybe<PurchaseMerchantInvoiceItem>>>;
  reference?: Maybe<Scalars['String']['output']>;
  totalAmount?: Maybe<Scalars['Float']['output']>;
  updatedAt?: Maybe<Scalars['Date']['output']>;
};

export type PurchaseMerchantInvoiceItem = {
  __typename?: 'PurchaseMerchantInvoiceItem';
  createdAt?: Maybe<Scalars['Date']['output']>;
  createdBy?: Maybe<User>;
  createdById?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  merchantInvoice?: Maybe<PurchaseMerchantInvoice>;
  merchantInvoiceId?: Maybe<Scalars['String']['output']>;
  price?: Maybe<Scalars['Float']['output']>;
  product?: Maybe<Product>;
  productId?: Maybe<Scalars['String']['output']>;
  quantity?: Maybe<Scalars['Float']['output']>;
  unitPrice?: Maybe<Scalars['Float']['output']>;
  updatedAt?: Maybe<Scalars['Date']['output']>;
};

export type PurchasePayment = {
  __typename?: 'PurchasePayment';
  business?: Maybe<Business>;
  businessId?: Maybe<Scalars['String']['output']>;
  chartOfAccount?: Maybe<ChartOfAccount>;
  chartOfAccountId?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['Date']['output']>;
  createdBy?: Maybe<User>;
  createdById?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  file?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  purchase?: Maybe<Purchase>;
  purchaseId?: Maybe<Scalars['String']['output']>;
  reference?: Maybe<Scalars['String']['output']>;
  total?: Maybe<Scalars['Float']['output']>;
  transactionDate?: Maybe<Scalars['Date']['output']>;
  updatedAt?: Maybe<Scalars['Date']['output']>;
};

export type PurchasePaymentEntry = {
  businessId: Scalars['String']['input'];
  description: Scalars['String']['input'];
  file?: InputMaybe<Scalars['String']['input']>;
  purchaseId: Scalars['String']['input'];
  total: Scalars['Float']['input'];
  transactionDate: Scalars['Date']['input'];
};

export type PurchaseStatusRef = {
  __typename?: 'PurchaseStatusRef';
  id?: Maybe<Scalars['Int']['output']>;
  purchaseStatus?: Maybe<Scalars['String']['output']>;
};

export type QuarterInvoiceAmounts = {
  __typename?: 'QuarterInvoiceAmounts';
  invoiceAmount?: Maybe<Scalars['Float']['output']>;
  invoicePaid?: Maybe<Scalars['Float']['output']>;
  invoicePending?: Maybe<Scalars['Float']['output']>;
  month?: Maybe<Scalars['String']['output']>;
};

export type QuarterlySales = {
  __typename?: 'QuarterlySales';
  cursorId?: Maybe<Scalars['String']['output']>;
  numberOfSalesThisQuarter: Scalars['Float']['output'];
  salesThisQuarter: Array<Maybe<Sale>>;
};

export type Query = {
  __typename?: 'Query';
  billingPlan?: Maybe<BillingPlan>;
  billingPlans: Array<BillingPlan>;
  checkIfNewBusiness?: Maybe<Scalars['Boolean']['output']>;
  getAccountCategories: Array<Maybe<AccountCategory>>;
  getAccountCategoryById?: Maybe<AccountCategory>;
  getAccountCategoryTypeById?: Maybe<AccountCategoryType>;
  getAccountCategoryTypes: Array<Maybe<AccountCategoryType>>;
  getAddOnOptions: Array<Maybe<AddOnOption>>;
  getBusinessById?: Maybe<Business>;
  getBusinessCOAByBusiness: Array<Maybe<BusinessChartOfAccount>>;
  getBusinessCOAById?: Maybe<BusinessChartOfAccount>;
  getBusinessCOAs: Array<Maybe<BusinessChartOfAccount>>;
  getBusinessCategories: Array<Maybe<BusinessCategory>>;
  getBusinessCategoryById?: Maybe<BusinessCategory>;
  getBusinessProductUnitById?: Maybe<BusinessProductUnit>;
  getBusinessProductUnits?: Maybe<Array<Maybe<BusinessProductUnit>>>;
  getBusinessServiceUnitById?: Maybe<BusinessServiceUnit>;
  getBusinessServiceUnits?: Maybe<Array<Maybe<BusinessServiceUnit>>>;
  getBusinesses: Array<Maybe<Business>>;
  getBusinessesByUserId?: Maybe<GetBusinessByUser>;
  getCategories: Array<Maybe<Category>>;
  getCategoryByBusiness: Array<Maybe<Category>>;
  getCategoryById?: Maybe<Category>;
  getChartOfAccountById?: Maybe<ChartOfAccount>;
  getChartOfAccounts: Array<Maybe<ChartOfAccount>>;
  getCombinedCOAs?: Maybe<Array<Maybe<CombinedChartOfAccount>>>;
  getCombinedProductUnits?: Maybe<Array<Maybe<CombinedProductUnit>>>;
  getCombinedServiceUnits?: Maybe<Array<Maybe<CombinedServiceUnit>>>;
  getCustomerByBusiness?: Maybe<GetCustomerResponse>;
  getCustomerByBusinessMobile?: Maybe<GetCustomerResponse>;
  getCustomerById?: Maybe<Customer>;
  getCustomers: Array<Maybe<Customer>>;
  getDailyExpensesForMonth?: Maybe<Array<Maybe<DailyExpense>>>;
  getDailyInvoicesAndSales?: Maybe<Array<Maybe<DailyInvoiceAndSale>>>;
  getDailyInvoicesPaidAndPending?: Maybe<Array<Maybe<DailyInvoicePendingAndPaid>>>;
  getEmployeeById: Employee;
  getEmployees: Array<Maybe<Employee>>;
  getExpenseAmountByCategories?: Maybe<Array<Maybe<ExpenseAmountByCategory>>>;
  getExpenseByBusiness?: Maybe<GetExpenseResponse>;
  getExpenseByBusinessMobile?: Maybe<GetExpenseResponse>;
  getExpenseById?: Maybe<Expense>;
  getExpenseCategories: Array<Maybe<ExpenseCategory>>;
  getExpenseCategoryAmountForMonth?: Maybe<Array<Maybe<ExpenseAmountByCategoryForMonth>>>;
  getExpenseCategoryAmountForQuarter?: Maybe<Array<Maybe<ExpenseAmountByCategoryForQuarter>>>;
  getExpenseCategoryAmountForWeek?: Maybe<Array<Maybe<ExpenseAmountByCategoryForWeek>>>;
  getExpenseCategoryAmountForYear?: Maybe<Array<Maybe<ExpenseAmountByCategoryForYear>>>;
  getExpenseCategoryById?: Maybe<ExpenseCategory>;
  getExpenseCategoryWithSets?: Maybe<GetExpenseCategoryResponse>;
  getExpenseMerchantInvoiceByBusiness: Array<Maybe<ExpenseMerchantInvoice>>;
  getExpenseMerchantInvoiceById?: Maybe<ExpenseMerchantInvoice>;
  getExpenseMerchantInvoices: Array<Maybe<ExpenseMerchantInvoice>>;
  getExpenseStatusRefs?: Maybe<Array<Maybe<ExpenseStatusRef>>>;
  getExpenses: Array<Maybe<Expense>>;
  getExpensesForMonth?: Maybe<TotalMonthlyExpense>;
  getExpensesForQuarter?: Maybe<TotalQuarterlyExpense>;
  getExpensesForWeek?: Maybe<TotalWeeklyExpense>;
  getExpensesForYear?: Maybe<TotalYearlyExpense>;
  getForgotPasswordEntries: Array<Maybe<ForgotPassword>>;
  getInviteById: Invite;
  getInvites: Array<Maybe<Invite>>;
  getInvoiceByBusiness?: Maybe<GetInvoiceByBusinessResponse>;
  getInvoiceByBusinessMobile?: Maybe<GetInvoiceByBusinessResponse>;
  getInvoiceByCustomer?: Maybe<GetInvoiceByCustomerResponse>;
  getInvoiceById?: Maybe<Invoice>;
  getInvoices: Array<Maybe<Invoice>>;
  getMerchantById: Merchant;
  getMerchants: Array<Maybe<Merchant>>;
  getMerchantsByBusiness: Array<Maybe<Merchant>>;
  getOfferById?: Maybe<Offer>;
  getOffers: Array<Maybe<Offer>>;
  getOptionById?: Maybe<Option>;
  getOptionIncluded: Array<Maybe<OptionIncluded>>;
  getOptionIncludedById?: Maybe<OptionIncluded>;
  getOptionIncludedByPlan?: Maybe<OptionIncluded>;
  getOptions: Array<Maybe<Option>>;
  getOutstandingInvoices: Array<Maybe<Invoice>>;
  getPaymentByBusiness: Array<Maybe<Payment>>;
  getPaymentByCustomer: Array<Maybe<Payment>>;
  getPaymentById?: Maybe<Payment>;
  getPayments: Array<Maybe<Payment>>;
  getPlanById?: Maybe<Plan>;
  getPlans: Array<Maybe<Plan>>;
  getProductById?: Maybe<Product>;
  getProductInvoiceDetailById?: Maybe<ProductInvoiceDetail>;
  getProductInvoiceDetails: Array<Maybe<ProductInvoiceDetail>>;
  getProductOrServiceByBusiness?: Maybe<GetProductOrServiceResponse>;
  getProductOrServiceById?: Maybe<ProductOrService>;
  getProductSaleItemById?: Maybe<ProductSaleItem>;
  getProductSaleItems: Array<Maybe<ProductSaleItem>>;
  getProductUnitById?: Maybe<ProductUnit>;
  getProductUnits: Array<Maybe<ProductUnit>>;
  getProducts: Array<Maybe<Product>>;
  getProductsByBusiness?: Maybe<GetProductResponse>;
  getProductsForWeek?: Maybe<GetProductForWeekResponse>;
  getPurchaseByBusiness?: Maybe<GetPurchaseByBusinessResponse>;
  getPurchaseByBusinessMobile?: Maybe<GetPurchaseByBusinessResponse>;
  getPurchaseById?: Maybe<Purchase>;
  getPurchaseForMonth?: Maybe<GetPurchaseForMonthResponse>;
  getPurchaseForQuarter?: Maybe<GetPurchaseForQuarterResponse>;
  getPurchaseForYear?: Maybe<GetPurchaseForYearResponse>;
  getPurchaseStatusRefs?: Maybe<Array<Maybe<PurchaseStatusRef>>>;
  getPurchases: Array<Maybe<Purchase>>;
  getPurchasesForWeek?: Maybe<GetPurchaseForWeekResponse>;
  getSaleByBusiness?: Maybe<GetSaleByBusinessResponse>;
  getSaleByBusinessMobile?: Maybe<GetSaleByBusinessResponse>;
  getSaleById?: Maybe<Sale>;
  getSaleStatusRefs: Array<Maybe<SaleStatusRef>>;
  getSales: Array<Maybe<Sale>>;
  getSalesForMonth?: Maybe<MonthlySales>;
  getSalesForQuarter?: Maybe<QuarterlySales>;
  getSalesForWeek?: Maybe<WeeklySales>;
  getSalesForYear?: Maybe<YearlySales>;
  getServiceByBusiness?: Maybe<GetServiceResponse>;
  getServiceById?: Maybe<Service>;
  getServiceForWeek?: Maybe<GetServiceForWeekResponse>;
  getServiceInvoiceDetailById?: Maybe<ServiceInvoiceDetail>;
  getServiceInvoiceDetails: Array<Maybe<ServiceInvoiceDetail>>;
  getServiceSaleItemById?: Maybe<ServiceSaleItem>;
  getServiceSaleItems: Array<Maybe<ServiceSaleItem>>;
  getServiceUnitById?: Maybe<ServiceUnit>;
  getServiceUnits: Array<Maybe<ServiceUnit>>;
  getServices: Array<Maybe<Service>>;
  getSettlementAccountById?: Maybe<SettlementAccount>;
  getSettlementAccounts?: Maybe<Array<Maybe<SettlementAccount>>>;
  getSettlementAccountsByBusiness?: Maybe<Array<Maybe<SettlementAccount>>>;
  getSubscriptionByBusiness: Array<Maybe<Subscription>>;
  getSubscriptionById?: Maybe<Subscription>;
  getSubscriptionInvoiceByBusiness: Array<Maybe<SubscriptionInvoice>>;
  getSubscriptionInvoiceByPlan: Array<Maybe<SubscriptionInvoice>>;
  getSubscriptionInvoiceBySubscription?: Maybe<SubscriptionInvoice>;
  getSubscriptionInvoices: Array<Maybe<SubscriptionInvoice>>;
  getSubscriptionInvoicesById?: Maybe<SubscriptionInvoice>;
  getSubscriptions: Array<Maybe<Subscription>>;
  getSubscriptionsByPlanId: Array<Maybe<Subscription>>;
  getUserById: User;
  getUserInvites: Array<Maybe<UserInvite>>;
  getUserInvitesByBusiness: Array<Maybe<UserInvite>>;
  getUsers: Array<Maybe<User>>;
  getWaitlist: Array<Maybe<UserWaitlist>>;
  getWaitlistByEmail?: Maybe<UserWaitlist>;
  invoiceAndExpenseGraphMonthly?: Maybe<Array<Maybe<InvoiceAndExpenseGraphMonthlyResponse>>>;
  invoiceAndExpenseGraphQuarterly?: Maybe<Array<Maybe<InvoiceAndExpenseGraphQuarterlyResponse>>>;
  invoiceAndExpenseGraphWeekly?: Maybe<Array<Maybe<InvoiceAndExpenseGraphWeeklyResponse>>>;
  invoiceAndExpenseGraphYearly?: Maybe<Array<Maybe<InvoiceAndExpenseGraphYearlyResponse>>>;
  isForgotPasswordLinkValid: Scalars['Boolean']['output'];
  numberOfCustomersThisMonth?: Maybe<TotalCustomersThisMonth>;
  numberOfCustomersThisQuarter?: Maybe<TotalCustomersThisQuarter>;
  numberOfCustomersThisWeek?: Maybe<TotalCustomersThisWeek>;
  numberOfCustomersThisYear?: Maybe<TotalCustomersThisYear>;
  numberOfInvoicesThisMonth?: Maybe<TotalInvoicesForMonth>;
  numberOfInvoicesThisQuarter?: Maybe<TotalInvoicesThisQuarter>;
  numberOfInvoicesThisWeek?: Maybe<TotalInvoicesForWeek>;
  numberOfInvoicesThisYear?: Maybe<TotalInvoicesThisYear>;
  productRevenueStream: Scalars['Float']['output'];
  role?: Maybe<Role>;
  roles: Array<Maybe<Role>>;
  searchCustomerByBusiness: Array<Maybe<Customer>>;
  searchExpenseByBusiness: Array<Maybe<Expense>>;
  searchMerchant: Array<Maybe<Merchant>>;
  searchProductOrServiceByBusiness: Array<Maybe<ProductOrService>>;
  searchProductsByBusiness: Array<Maybe<Product>>;
  searchServicesByBusiness: Array<Maybe<Service>>;
  serviceRevenueStream: Scalars['Float']['output'];
  subscriptionCheckerForFrontend?: Maybe<Scalars['Boolean']['output']>;
  totalInvoiceAmountPerMonthSelector?: Maybe<TotalInvoiceAmountSelector>;
  totalMonthlyInvoicesAmount?: Maybe<TotalMonthlyInvoiceAmount>;
  totalProfit: ProfitObjectResponse;
  totalQuarterlyInvoicesAmount?: Maybe<TotalQuarterInvoiceAmounts>;
  totalWeeklyInvoicesAmount?: Maybe<TotalWeeklyInvoiceAmount>;
  totalYearlyInvoicesAmount?: Maybe<TotalYearInvoiceAmounts>;
  verzoPlusSubscriptionCheckerForFrontend?: Maybe<Scalars['Boolean']['output']>;
};


export type QueryBillingPlanArgs = {
  billingPlanId: Scalars['String']['input'];
};


export type QueryCheckIfNewBusinessArgs = {
  businessId: Scalars['String']['input'];
};


export type QueryGetAccountCategoryByIdArgs = {
  accountCategoryId?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetAccountCategoryTypeByIdArgs = {
  accountCategoryTypeId: Scalars['String']['input'];
};


export type QueryGetBusinessByIdArgs = {
  businessId: Scalars['String']['input'];
};


export type QueryGetBusinessCoaByBusinessArgs = {
  businessId: Scalars['String']['input'];
};


export type QueryGetBusinessCoaByIdArgs = {
  businessCoaId: Scalars['String']['input'];
};


export type QueryGetBusinessCategoryByIdArgs = {
  businessCategoryId: Scalars['String']['input'];
};


export type QueryGetBusinessProductUnitByIdArgs = {
  productUnitId: Scalars['String']['input'];
};


export type QueryGetBusinessProductUnitsArgs = {
  businessId: Scalars['String']['input'];
};


export type QueryGetBusinessServiceUnitByIdArgs = {
  serviceUnitId: Scalars['String']['input'];
};


export type QueryGetBusinessServiceUnitsArgs = {
  businessId: Scalars['String']['input'];
};


export type QueryGetCategoryByBusinessArgs = {
  businessId?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetCategoryByIdArgs = {
  categoryId: Scalars['String']['input'];
};


export type QueryGetChartOfAccountByIdArgs = {
  coaId: Scalars['String']['input'];
};


export type QueryGetCombinedCoAsArgs = {
  businessId: Scalars['String']['input'];
};


export type QueryGetCombinedProductUnitsArgs = {
  businessId: Scalars['String']['input'];
};


export type QueryGetCombinedServiceUnitsArgs = {
  businessId: Scalars['String']['input'];
};


export type QueryGetCustomerByBusinessArgs = {
  businessId: Scalars['String']['input'];
  cursor?: InputMaybe<Scalars['String']['input']>;
  sets?: InputMaybe<Scalars['Float']['input']>;
};


export type QueryGetCustomerByBusinessMobileArgs = {
  businessId: Scalars['String']['input'];
  cursor?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Float']['input']>;
};


export type QueryGetCustomerByIdArgs = {
  customerId: Scalars['String']['input'];
};


export type QueryGetDailyExpensesForMonthArgs = {
  businessId: Scalars['String']['input'];
  month: Scalars['Float']['input'];
  year: Scalars['Float']['input'];
};


export type QueryGetDailyInvoicesAndSalesArgs = {
  businessId: Scalars['String']['input'];
  month: Scalars['Float']['input'];
  year: Scalars['Float']['input'];
};


export type QueryGetDailyInvoicesPaidAndPendingArgs = {
  businessId: Scalars['String']['input'];
  month: Scalars['Float']['input'];
  year: Scalars['Float']['input'];
};


export type QueryGetEmployeeByIdArgs = {
  employeeId?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetExpenseByBusinessArgs = {
  businessId: Scalars['String']['input'];
  cursor?: InputMaybe<Scalars['String']['input']>;
  sets?: InputMaybe<Scalars['Float']['input']>;
};


export type QueryGetExpenseByBusinessMobileArgs = {
  businessId: Scalars['String']['input'];
  cursor?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Float']['input']>;
};


export type QueryGetExpenseByIdArgs = {
  expenseId: Scalars['String']['input'];
};


export type QueryGetExpenseCategoryAmountForMonthArgs = {
  businessId: Scalars['String']['input'];
  monthly?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryGetExpenseCategoryAmountForQuarterArgs = {
  businessId: Scalars['String']['input'];
  quarterly?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryGetExpenseCategoryAmountForWeekArgs = {
  businessId: Scalars['String']['input'];
  weekly?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryGetExpenseCategoryAmountForYearArgs = {
  businessId: Scalars['String']['input'];
  yearly?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryGetExpenseCategoryByIdArgs = {
  expenseCategoryId: Scalars['String']['input'];
};


export type QueryGetExpenseCategoryWithSetsArgs = {
  cursor?: InputMaybe<Scalars['String']['input']>;
  sets?: InputMaybe<Scalars['Float']['input']>;
};


export type QueryGetExpenseMerchantInvoiceByBusinessArgs = {
  businessId: Scalars['String']['input'];
};


export type QueryGetExpenseMerchantInvoiceByIdArgs = {
  merchantInvoiceId: Scalars['String']['input'];
};


export type QueryGetExpensesForMonthArgs = {
  businessId: Scalars['String']['input'];
  monthly?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryGetExpensesForQuarterArgs = {
  businessId: Scalars['String']['input'];
  quarterly?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryGetExpensesForWeekArgs = {
  businessId: Scalars['String']['input'];
  weekly?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryGetExpensesForYearArgs = {
  businessId: Scalars['String']['input'];
  yearly?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryGetInviteByIdArgs = {
  inviteId: Scalars['String']['input'];
};


export type QueryGetInvoiceByBusinessArgs = {
  businessId: Scalars['String']['input'];
  cursor?: InputMaybe<Scalars['String']['input']>;
  sets?: InputMaybe<Scalars['Float']['input']>;
};


export type QueryGetInvoiceByBusinessMobileArgs = {
  businessId: Scalars['String']['input'];
  cursor?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Float']['input']>;
};


export type QueryGetInvoiceByCustomerArgs = {
  cursor?: InputMaybe<Scalars['String']['input']>;
  customerId: Scalars['String']['input'];
  sets?: InputMaybe<Scalars['Float']['input']>;
};


export type QueryGetInvoiceByIdArgs = {
  invoiceId: Scalars['String']['input'];
};


export type QueryGetMerchantByIdArgs = {
  merchantId: Scalars['String']['input'];
};


export type QueryGetMerchantsByBusinessArgs = {
  businessId: Scalars['String']['input'];
};


export type QueryGetOfferByIdArgs = {
  offerId: Scalars['String']['input'];
};


export type QueryGetOptionByIdArgs = {
  optionId?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetOptionIncludedByIdArgs = {
  optionIncludedId: Scalars['String']['input'];
};


export type QueryGetOptionIncludedByPlanArgs = {
  planId: Scalars['String']['input'];
};


export type QueryGetOutstandingInvoicesArgs = {
  businessId: Scalars['String']['input'];
};


export type QueryGetPaymentByBusinessArgs = {
  businessId: Scalars['String']['input'];
};


export type QueryGetPaymentByCustomerArgs = {
  customerId: Scalars['String']['input'];
};


export type QueryGetPaymentByIdArgs = {
  paymentId: Scalars['String']['input'];
};


export type QueryGetPlanByIdArgs = {
  planId: Scalars['String']['input'];
};


export type QueryGetProductByIdArgs = {
  productId: Scalars['String']['input'];
};


export type QueryGetProductInvoiceDetailByIdArgs = {
  productInvoiceDetailId: Scalars['String']['input'];
};


export type QueryGetProductOrServiceByBusinessArgs = {
  businessId: Scalars['String']['input'];
  cursor?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Float']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetProductOrServiceByIdArgs = {
  itemId: Scalars['String']['input'];
  type: Scalars['String']['input'];
};


export type QueryGetProductSaleItemByIdArgs = {
  productSaleItemId: Scalars['String']['input'];
};


export type QueryGetProductUnitByIdArgs = {
  productUnitId: Scalars['String']['input'];
};


export type QueryGetProductsByBusinessArgs = {
  businessId: Scalars['String']['input'];
  cursor?: InputMaybe<Scalars['String']['input']>;
  sets?: InputMaybe<Scalars['Float']['input']>;
};


export type QueryGetProductsForWeekArgs = {
  businessId: Scalars['String']['input'];
  weekly?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryGetPurchaseByBusinessArgs = {
  businessId: Scalars['String']['input'];
  cursor?: InputMaybe<Scalars['String']['input']>;
  sets?: InputMaybe<Scalars['Float']['input']>;
};


export type QueryGetPurchaseByBusinessMobileArgs = {
  businessId: Scalars['String']['input'];
  cursor?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Float']['input']>;
};


export type QueryGetPurchaseByIdArgs = {
  purchaseId: Scalars['String']['input'];
};


export type QueryGetPurchaseForMonthArgs = {
  businessId: Scalars['String']['input'];
  monthly?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryGetPurchaseForQuarterArgs = {
  businessId: Scalars['String']['input'];
  quarterly?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryGetPurchaseForYearArgs = {
  businessId: Scalars['String']['input'];
  yearly?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryGetPurchasesForWeekArgs = {
  businessId: Scalars['String']['input'];
  weekly?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryGetSaleByBusinessArgs = {
  businessId: Scalars['String']['input'];
  cursor?: InputMaybe<Scalars['String']['input']>;
  sets?: InputMaybe<Scalars['Float']['input']>;
};


export type QueryGetSaleByBusinessMobileArgs = {
  businessId: Scalars['String']['input'];
  cursor?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Float']['input']>;
};


export type QueryGetSaleByIdArgs = {
  saleId: Scalars['String']['input'];
};


export type QueryGetSalesForMonthArgs = {
  businessId: Scalars['String']['input'];
  cursor?: InputMaybe<Scalars['String']['input']>;
  monthly?: InputMaybe<Scalars['Boolean']['input']>;
  sets?: InputMaybe<Scalars['Float']['input']>;
};


export type QueryGetSalesForQuarterArgs = {
  businessId: Scalars['String']['input'];
  cursor?: InputMaybe<Scalars['String']['input']>;
  quarterly?: InputMaybe<Scalars['Boolean']['input']>;
  sets?: InputMaybe<Scalars['Float']['input']>;
};


export type QueryGetSalesForWeekArgs = {
  businessId: Scalars['String']['input'];
  cursor?: InputMaybe<Scalars['String']['input']>;
  sets?: InputMaybe<Scalars['Float']['input']>;
  weekly?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryGetSalesForYearArgs = {
  businessId: Scalars['String']['input'];
  cursor?: InputMaybe<Scalars['String']['input']>;
  sets?: InputMaybe<Scalars['Float']['input']>;
  yearly?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryGetServiceByBusinessArgs = {
  businessId: Scalars['String']['input'];
  cursor?: InputMaybe<Scalars['String']['input']>;
  sets?: InputMaybe<Scalars['Float']['input']>;
};


export type QueryGetServiceByIdArgs = {
  serviceId: Scalars['String']['input'];
};


export type QueryGetServiceForWeekArgs = {
  businessId: Scalars['String']['input'];
  weekly?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryGetServiceInvoiceDetailByIdArgs = {
  serviceInvoiceDetailId: Scalars['String']['input'];
};


export type QueryGetServiceSaleItemByIdArgs = {
  serviceSaleItemId: Scalars['String']['input'];
};


export type QueryGetServiceUnitByIdArgs = {
  serviceUnitId: Scalars['String']['input'];
};


export type QueryGetSettlementAccountByIdArgs = {
  accountId: Scalars['String']['input'];
};


export type QueryGetSettlementAccountsByBusinessArgs = {
  businessId: Scalars['String']['input'];
};


export type QueryGetSubscriptionByBusinessArgs = {
  businessId: Scalars['String']['input'];
};


export type QueryGetSubscriptionByIdArgs = {
  subscriptionId: Scalars['String']['input'];
};


export type QueryGetSubscriptionInvoiceByBusinessArgs = {
  businessId: Scalars['String']['input'];
};


export type QueryGetSubscriptionInvoiceByPlanArgs = {
  planId: Scalars['String']['input'];
};


export type QueryGetSubscriptionInvoiceBySubscriptionArgs = {
  subscriptionId: Scalars['String']['input'];
};


export type QueryGetSubscriptionInvoicesByIdArgs = {
  subscriptionInvoiceId: Scalars['String']['input'];
};


export type QueryGetSubscriptionsByPlanIdArgs = {
  planId: Scalars['String']['input'];
};


export type QueryGetUserByIdArgs = {
  userId?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetUserInvitesByBusinessArgs = {
  businessId: Scalars['String']['input'];
};


export type QueryGetWaitlistByEmailArgs = {
  email: Scalars['String']['input'];
};


export type QueryInvoiceAndExpenseGraphMonthlyArgs = {
  businessId: Scalars['String']['input'];
  monthly?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryInvoiceAndExpenseGraphQuarterlyArgs = {
  businessId: Scalars['String']['input'];
  quarterly?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryInvoiceAndExpenseGraphWeeklyArgs = {
  businessId: Scalars['String']['input'];
  weekly?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryInvoiceAndExpenseGraphYearlyArgs = {
  businessId: Scalars['String']['input'];
  yearly?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryIsForgotPasswordLinkValidArgs = {
  forgotPasswordId: Scalars['String']['input'];
};


export type QueryNumberOfCustomersThisMonthArgs = {
  businessId: Scalars['String']['input'];
  monthly?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryNumberOfCustomersThisQuarterArgs = {
  businessId: Scalars['String']['input'];
  quarterly?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryNumberOfCustomersThisWeekArgs = {
  businessId: Scalars['String']['input'];
  weekly?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryNumberOfCustomersThisYearArgs = {
  businessId: Scalars['String']['input'];
  yearly?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryNumberOfInvoicesThisMonthArgs = {
  businessId: Scalars['String']['input'];
  monthly?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryNumberOfInvoicesThisQuarterArgs = {
  businessId: Scalars['String']['input'];
  quarterly?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryNumberOfInvoicesThisWeekArgs = {
  businessId: Scalars['String']['input'];
  weekly?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryNumberOfInvoicesThisYearArgs = {
  businessId: Scalars['String']['input'];
  yearly?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryProductRevenueStreamArgs = {
  businessId: Scalars['String']['input'];
};


export type QueryRoleArgs = {
  roleId: Scalars['String']['input'];
};


export type QuerySearchCustomerByBusinessArgs = {
  businessId: Scalars['String']['input'];
  search: Scalars['String']['input'];
};


export type QuerySearchExpenseByBusinessArgs = {
  businessId: Scalars['String']['input'];
  search: Scalars['String']['input'];
};


export type QuerySearchMerchantArgs = {
  businessId: Scalars['String']['input'];
  search: Scalars['String']['input'];
};


export type QuerySearchProductOrServiceByBusinessArgs = {
  businessId: Scalars['String']['input'];
  search: Scalars['String']['input'];
};


export type QuerySearchProductsByBusinessArgs = {
  businessId: Scalars['String']['input'];
  search: Scalars['String']['input'];
};


export type QuerySearchServicesByBusinessArgs = {
  businessId: Scalars['String']['input'];
  search: Scalars['String']['input'];
};


export type QueryServiceRevenueStreamArgs = {
  businessId: Scalars['String']['input'];
};


export type QueryTotalInvoiceAmountPerMonthSelectorArgs = {
  businessId: Scalars['String']['input'];
  month: Scalars['Float']['input'];
  year: Scalars['Float']['input'];
};


export type QueryTotalMonthlyInvoicesAmountArgs = {
  businessId: Scalars['String']['input'];
  monthly?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryTotalProfitArgs = {
  businessId: Scalars['String']['input'];
};


export type QueryTotalQuarterlyInvoicesAmountArgs = {
  businessId: Scalars['String']['input'];
  quarterly?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryTotalWeeklyInvoicesAmountArgs = {
  businessId: Scalars['String']['input'];
  weekly?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryTotalYearlyInvoicesAmountArgs = {
  businessId: Scalars['String']['input'];
  yearly?: InputMaybe<Scalars['Boolean']['input']>;
};

export type ResetPassword = {
  newPassword: Scalars['String']['input'];
  oldPassword: Scalars['String']['input'];
};

export type Result = {
  __typename?: 'Result';
  invoiceDate: Scalars['Date']['output'];
  totalInvoiceAmount: Scalars['Float']['output'];
};

export type Role = {
  __typename?: 'Role';
  createdAt: Scalars['Date']['output'];
  id: Scalars['String']['output'];
  roleDescription?: Maybe<Scalars['String']['output']>;
  roleName: Scalars['String']['output'];
  updatedAt: Scalars['Date']['output'];
};

export type Sale = {
  __typename?: 'Sale';
  archived?: Maybe<Scalars['Boolean']['output']>;
  business?: Maybe<Business>;
  businessId?: Maybe<Scalars['String']['output']>;
  chartOfAccount?: Maybe<ChartOfAccount>;
  chartOfAccountId?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['Date']['output']>;
  createdBy?: Maybe<User>;
  createdById?: Maybe<Scalars['String']['output']>;
  customer?: Maybe<Customer>;
  customerId?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  dueDate?: Maybe<Scalars['Date']['output']>;
  id: Scalars['String']['output'];
  invoice?: Maybe<Invoice>;
  invoiceId?: Maybe<Scalars['String']['output']>;
  paid?: Maybe<Scalars['Boolean']['output']>;
  paidAt?: Maybe<Scalars['Date']['output']>;
  productSaleItems?: Maybe<Array<Maybe<ProductSaleItem>>>;
  reference?: Maybe<Scalars['String']['output']>;
  saleAmount?: Maybe<Scalars['Float']['output']>;
  saleAmountPaid?: Maybe<Scalars['Float']['output']>;
  saleExpenses?: Maybe<Array<Maybe<SaleExpense>>>;
  saleLines?: Maybe<Array<Maybe<SaleLine>>>;
  salePayments?: Maybe<Array<Maybe<SalePayment>>>;
  saleServiceExpenses?: Maybe<Array<Maybe<SaleServiceExpense>>>;
  saleStatus?: Maybe<SaleStatusRef>;
  saleStatusId?: Maybe<Scalars['Int']['output']>;
  serviceSaleItems?: Maybe<Array<Maybe<ServiceSaleItem>>>;
  transactionDate?: Maybe<Scalars['Date']['output']>;
  updatedAt?: Maybe<Scalars['Date']['output']>;
};

export type SaleExpense = {
  __typename?: 'SaleExpense';
  amount?: Maybe<Scalars['Float']['output']>;
  business?: Maybe<Business>;
  businessId?: Maybe<Scalars['String']['output']>;
  chartOfAccount?: Maybe<ChartOfAccount>;
  chartOfAccountId?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['Date']['output'];
  createdBy?: Maybe<User>;
  createdById?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  effected?: Maybe<Scalars['Boolean']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  index?: Maybe<Scalars['Float']['output']>;
  sale?: Maybe<Sale>;
  saleExpensePayment?: Maybe<SaleExpensePayment>;
  saleExpensePaymentId?: Maybe<Scalars['String']['output']>;
  saleId?: Maybe<Scalars['String']['output']>;
  transactionDate?: Maybe<Scalars['Date']['output']>;
  updatedAt: Scalars['Date']['output'];
};

export type SaleExpenseItem = {
  amount: Scalars['Float']['input'];
  description: Scalars['String']['input'];
  index: Scalars['Float']['input'];
};

export type SaleExpensePayment = {
  __typename?: 'SaleExpensePayment';
  business?: Maybe<Business>;
  businessId?: Maybe<Scalars['String']['output']>;
  chartOfAccount?: Maybe<ChartOfAccount>;
  chartOfAccountId?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['Date']['output']>;
  createdBy?: Maybe<User>;
  createdById?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  file?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  reference?: Maybe<Scalars['String']['output']>;
  total?: Maybe<Scalars['Float']['output']>;
  transactionDate?: Maybe<Scalars['Date']['output']>;
};

export type SaleLine = {
  __typename?: 'SaleLine';
  business?: Maybe<Business>;
  businessId: Scalars['String']['output'];
  chartOfAccount?: Maybe<ChartOfAccount>;
  createdAt?: Maybe<Scalars['Date']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  lineAmount: Scalars['Float']['output'];
  lineChartOfAccountId: Scalars['String']['output'];
  lineQuantity?: Maybe<Scalars['Float']['output']>;
  product?: Maybe<Product>;
  productId?: Maybe<Scalars['String']['output']>;
  sale?: Maybe<Sale>;
  saleId: Scalars['String']['output'];
  service?: Maybe<Service>;
  serviceId?: Maybe<Scalars['String']['output']>;
  transactionDate: Scalars['Date']['output'];
};

export type SalePayment = {
  __typename?: 'SalePayment';
  business?: Maybe<Business>;
  businessId?: Maybe<Scalars['String']['output']>;
  chartOfAccount?: Maybe<ChartOfAccount>;
  chartOfAccountId?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['Date']['output']>;
  createdBy?: Maybe<User>;
  createdById?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  file?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  reference?: Maybe<Scalars['String']['output']>;
  total?: Maybe<Scalars['Float']['output']>;
  transactionDate?: Maybe<Scalars['Date']['output']>;
};

export type SaleServiceExpense = {
  __typename?: 'SaleServiceExpense';
  amount?: Maybe<Scalars['Float']['output']>;
  business?: Maybe<Business>;
  businessId?: Maybe<Scalars['String']['output']>;
  chartOfAccount?: Maybe<ChartOfAccount>;
  chartOfAccountId?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['Date']['output']>;
  createdBy?: Maybe<User>;
  createdById?: Maybe<Scalars['String']['output']>;
  effected?: Maybe<Scalars['Boolean']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  index?: Maybe<Scalars['Float']['output']>;
  sale?: Maybe<Sale>;
  saleExpensePayment?: Maybe<SaleExpensePayment>;
  saleExpensePaymentId?: Maybe<Scalars['String']['output']>;
  saleId?: Maybe<Scalars['String']['output']>;
  service?: Maybe<Service>;
  serviceId?: Maybe<Scalars['String']['output']>;
  serviceType?: Maybe<Scalars['String']['output']>;
  transactionDate?: Maybe<Scalars['Date']['output']>;
  updatedAt?: Maybe<Scalars['Date']['output']>;
};

export type SaleServiceExpenseEntry = {
  amount: Scalars['Float']['input'];
  description: Scalars['String']['input'];
  index: Scalars['Float']['input'];
  serviceId: Scalars['String']['input'];
};

export type SaleStatus = {
  __typename?: 'SaleStatus';
  business?: Maybe<Business>;
  businessId: Scalars['String']['output'];
  createdAt?: Maybe<Scalars['Date']['output']>;
  id: Scalars['String']['output'];
  statusName: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['Date']['output']>;
};

export type SaleStatusRef = {
  __typename?: 'SaleStatusRef';
  id?: Maybe<Scalars['Int']['output']>;
  saleStatus?: Maybe<Scalars['String']['output']>;
};

export type SeerbitPaymentInput = {
  amount: Scalars['Float']['input'];
  email: Scalars['String']['input'];
  fullname: Scalars['String']['input'];
  uuid: Scalars['String']['input'];
};

export type SeerbitStandardCheckoutResponse = {
  __typename?: 'SeerbitStandardCheckoutResponse';
  paymentLink?: Maybe<Scalars['String']['output']>;
  paymentReference?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['String']['output']>;
};

export type SeerbitTokenizeChargeInput = {
  amount: Scalars['Float']['input'];
  token: Scalars['String']['input'];
  uuid: Scalars['String']['input'];
};

export type Service = {
  __typename?: 'Service';
  business?: Maybe<Business>;
  businessId: Scalars['String']['output'];
  businessServiceUnit?: Maybe<BusinessServiceUnit>;
  businessServiceUnitId?: Maybe<Scalars['String']['output']>;
  category?: Maybe<Category>;
  categoryId?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['Date']['output']>;
  createdBy?: Maybe<User>;
  createdById?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  isArchived?: Maybe<Scalars['Boolean']['output']>;
  name: Scalars['String']['output'];
  price: Scalars['Float']['output'];
  serviceUnit?: Maybe<ServiceUnit>;
  serviceUnitId?: Maybe<Scalars['String']['output']>;
  tax: Scalars['Float']['output'];
  type?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['Date']['output']>;
};

export type ServiceDetail = {
  index?: InputMaybe<Scalars['Float']['input']>;
  price: Scalars['Float']['input'];
  quantity?: InputMaybe<Scalars['Float']['input']>;
  serviceId: Scalars['String']['input'];
};

export type ServiceInvoiceDetail = {
  __typename?: 'ServiceInvoiceDetail';
  archived?: Maybe<Scalars['Boolean']['output']>;
  createdAt?: Maybe<Scalars['Date']['output']>;
  discount?: Maybe<Scalars['Float']['output']>;
  id: Scalars['String']['output'];
  invoiceDetail?: Maybe<InvoiceDetail>;
  price: Scalars['Float']['output'];
  quantity?: Maybe<Scalars['Float']['output']>;
  service?: Maybe<Service>;
  serviceId: Scalars['String']['output'];
  type: Scalars['String']['output'];
  unitPrice?: Maybe<Scalars['Float']['output']>;
  updatedAt?: Maybe<Scalars['Date']['output']>;
};

export type ServiceSaleItem = {
  __typename?: 'ServiceSaleItem';
  business?: Maybe<Business>;
  businessId: Scalars['String']['output'];
  createdAt?: Maybe<Scalars['Date']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  price: Scalars['Float']['output'];
  pricePerUnit: Scalars['Float']['output'];
  quantity: Scalars['Float']['output'];
  sale?: Maybe<Sale>;
  saleId: Scalars['String']['output'];
  salePerson?: Maybe<User>;
  salePersonId?: Maybe<Scalars['String']['output']>;
  service?: Maybe<Service>;
  serviceId: Scalars['String']['output'];
  tax?: Maybe<Scalars['Float']['output']>;
  updatedAt?: Maybe<Scalars['Date']['output']>;
};

export type ServiceUnit = {
  __typename?: 'ServiceUnit';
  createdAt?: Maybe<Scalars['Date']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  isArchived?: Maybe<Scalars['Boolean']['output']>;
  unitName?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['Date']['output']>;
};

export type SettlementAccount = {
  __typename?: 'SettlementAccount';
  accountName?: Maybe<Scalars['String']['output']>;
  accountNumber?: Maybe<Scalars['String']['output']>;
  bankName?: Maybe<Scalars['String']['output']>;
  business?: Maybe<Business>;
  businessId?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['Date']['output']>;
  createdBy?: Maybe<User>;
  createdById?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['Date']['output']>;
};

export type SignInDetails = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type SignUpDetails = {
  email: Scalars['String']['input'];
  fullname: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type Subscription = {
  __typename?: 'Subscription';
  addOn?: Maybe<Array<Maybe<AddOn>>>;
  business?: Maybe<Business>;
  businessId: Scalars['String']['output'];
  currentPlanId: Scalars['String']['output'];
  dateSubscribed: Scalars['Date']['output'];
  dateUnsubscribed?: Maybe<Scalars['Date']['output']>;
  id: Scalars['String']['output'];
  offer?: Maybe<Offer>;
  offerEndDate?: Maybe<Scalars['Date']['output']>;
  offerId?: Maybe<Scalars['String']['output']>;
  offerStartDate?: Maybe<Scalars['Date']['output']>;
  plan?: Maybe<Plan>;
  subscriptionInvoice?: Maybe<Array<Maybe<SubscriptionInvoice>>>;
  subscriptionPayment?: Maybe<SubscriptionPayment>;
  trialPeriodEnd?: Maybe<Scalars['Date']['output']>;
  trialPeriodStart?: Maybe<Scalars['Date']['output']>;
  validTo: Scalars['Date']['output'];
};

export type SubscriptionInvoice = {
  __typename?: 'SubscriptionInvoice';
  id: Scalars['String']['output'];
  invoiceAmount: Scalars['Float']['output'];
  invoiceCreatedAt?: Maybe<Scalars['Date']['output']>;
  invoiceDescription?: Maybe<Scalars['String']['output']>;
  invoicePaid?: Maybe<Scalars['Date']['output']>;
  invoicePeriodEnd?: Maybe<Scalars['Date']['output']>;
  invoicePeriodStart?: Maybe<Scalars['Date']['output']>;
  invoiceTotal?: Maybe<Scalars['Float']['output']>;
  paymentReference?: Maybe<Scalars['String']['output']>;
  planHistory?: Maybe<PlanHistory>;
  planHistoryId: Scalars['String']['output'];
  subscription?: Maybe<Subscription>;
  subscriptionId: Scalars['String']['output'];
  tax?: Maybe<Scalars['Float']['output']>;
};

export type SubscriptionPayment = {
  __typename?: 'SubscriptionPayment';
  amount?: Maybe<Scalars['Float']['output']>;
  card?: Maybe<Card>;
  cardId?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['Date']['output']>;
  id: Scalars['String']['output'];
  subscription?: Maybe<Subscription>;
  subscriptionId?: Maybe<Scalars['String']['output']>;
};

export type SuccessInfo = {
  __typename?: 'SuccessInfo';
  message?: Maybe<Scalars['String']['output']>;
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type Token = {
  __typename?: 'Token';
  access_token: Scalars['String']['output'];
  refresh_token: Scalars['String']['output'];
};

export type TokenWithVerificationStatus = {
  __typename?: 'TokenWithVerificationStatus';
  token: Token;
  verified?: Maybe<Scalars['Boolean']['output']>;
};

export type TokenizedDetails = {
  amount?: InputMaybe<Scalars['Float']['input']>;
  country?: InputMaybe<Scalars['String']['input']>;
  currency?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  narration?: InputMaybe<Scalars['String']['input']>;
  token?: InputMaybe<Scalars['String']['input']>;
  tx_ref?: InputMaybe<Scalars['String']['input']>;
};

export type TotalCustomersThisMonth = {
  __typename?: 'TotalCustomersThisMonth';
  customersThisMonth: Scalars['Float']['output'];
  totalCustomers: Scalars['Float']['output'];
};

export type TotalCustomersThisQuarter = {
  __typename?: 'TotalCustomersThisQuarter';
  customersThisQuarter: Scalars['Float']['output'];
  totalCustomers: Scalars['Float']['output'];
};

export type TotalCustomersThisWeek = {
  __typename?: 'TotalCustomersThisWeek';
  customersThisWeek: Scalars['Float']['output'];
  totalCustomers: Scalars['Float']['output'];
};

export type TotalCustomersThisYear = {
  __typename?: 'TotalCustomersThisYear';
  customersThisYear: Scalars['Float']['output'];
  totalCustomers: Scalars['Float']['output'];
};

export type TotalInvoiceAmountSelector = {
  __typename?: 'TotalInvoiceAmountSelector';
  result: Array<Maybe<Result>>;
  totalForMonth?: Maybe<Scalars['Float']['output']>;
};

export type TotalInvoicesForMonth = {
  __typename?: 'TotalInvoicesForMonth';
  invoicesThisMonth: Scalars['Float']['output'];
  totalInvoices: Scalars['Float']['output'];
};

export type TotalInvoicesForWeek = {
  __typename?: 'TotalInvoicesForWeek';
  invoicesThisweek: Scalars['Float']['output'];
  totalInvoices: Scalars['Float']['output'];
};

export type TotalInvoicesThisQuarter = {
  __typename?: 'TotalInvoicesThisQuarter';
  invoicesThisQuarter: Scalars['Float']['output'];
  totalInvoices: Scalars['Float']['output'];
};

export type TotalInvoicesThisYear = {
  __typename?: 'TotalInvoicesThisYear';
  invoicesThisYear: Scalars['Float']['output'];
  totalInvoices: Scalars['Float']['output'];
};

export type TotalMonthlyExpense = {
  __typename?: 'TotalMonthlyExpense';
  percentageIncreaseInExpenseThisMonth?: Maybe<Scalars['Float']['output']>;
  percentageOfExpenseToInvoiceThisMonth: Scalars['Float']['output'];
  totalExpenseAmountThisMonth: Scalars['Float']['output'];
};

export type TotalMonthlyInvoiceAmount = {
  __typename?: 'TotalMonthlyInvoiceAmount';
  dailyTotalAmountsForMonth: Array<Maybe<DailyInvoiceTotalAmounts>>;
  percentageIncreaseInInvoicesThisMonth?: Maybe<Scalars['Float']['output']>;
  percentageIncreaseInOverdueInvoicesThisMonth?: Maybe<Scalars['Float']['output']>;
  percentageIncreaseInPendingInvoiceThisMonth?: Maybe<Scalars['Float']['output']>;
  percentageOfPaidInvoicesForMonth?: Maybe<Scalars['Float']['output']>;
  totalInvoiceAmountForMonth?: Maybe<Scalars['Float']['output']>;
  totalOverdueInvoiceAmountThisMonth?: Maybe<Scalars['Float']['output']>;
  totalPendingInvoiceAmountThisMonth?: Maybe<Scalars['Float']['output']>;
};

export type TotalQuarterInvoiceAmounts = {
  __typename?: 'TotalQuarterInvoiceAmounts';
  percentageIncreaseInInvoiceThisQuarter?: Maybe<Scalars['Float']['output']>;
  percentageIncreaseInOverdueInvoiceThisQuarter?: Maybe<Scalars['Float']['output']>;
  percentageIncreaseInPendingInvoiceThisQuarter?: Maybe<Scalars['Float']['output']>;
  percentageOfInvoicePaidForQuarter?: Maybe<Scalars['Float']['output']>;
  quarterInvoiceAmounts: Array<Maybe<QuarterInvoiceAmounts>>;
  totalInvoiceAmountForQuarter?: Maybe<Scalars['Float']['output']>;
  totalOverdueInvoiceAmountThisQuarter?: Maybe<Scalars['Float']['output']>;
  totalPendingInvoiceAmountThisQuarter?: Maybe<Scalars['Float']['output']>;
};

export type TotalQuarterlyExpense = {
  __typename?: 'TotalQuarterlyExpense';
  percentageIncreaseInExpensesThisQuarter?: Maybe<Scalars['Float']['output']>;
  percentageOfExpenseToInvoiceThisQuarter: Scalars['Float']['output'];
  totalExpenseAmountThisQuarter: Scalars['Float']['output'];
};

export type TotalWeeklyExpense = {
  __typename?: 'TotalWeeklyExpense';
  percentageIncreaseInExpenseThisWeek?: Maybe<Scalars['Float']['output']>;
  percentageOfExpenseToInvoiceThisWeek: Scalars['Float']['output'];
  totalExpenseAmountThisWeek: Scalars['Float']['output'];
};

export type TotalWeeklyInvoiceAmount = {
  __typename?: 'TotalWeeklyInvoiceAmount';
  dailyTotalAmounts: Array<Maybe<DailyInvoiceTotalAmounts>>;
  percentageIncreaseInOverdueInvoicesThisWeek?: Maybe<Scalars['Float']['output']>;
  percentageIncreaseInPendingInvoiceThisWeek?: Maybe<Scalars['Float']['output']>;
  percentageOfIncreaseInInvoicesThisWeek?: Maybe<Scalars['Float']['output']>;
  percentageOfPaidInvoices?: Maybe<Scalars['Float']['output']>;
  totalInvoiceAmountForWeek?: Maybe<Scalars['Float']['output']>;
  totalOverDueInvoiceAmountThisWeek?: Maybe<Scalars['Float']['output']>;
  totalPendingInvoiceAmountThisWeek?: Maybe<Scalars['Float']['output']>;
};

export type TotalYearInvoiceAmounts = {
  __typename?: 'TotalYearInvoiceAmounts';
  monthlyTotalAmounts: Array<Maybe<YearInvoiceAmounts>>;
  percentageIncreaseInInvoiceThisYear?: Maybe<Scalars['Float']['output']>;
  percentageIncreaseInOverdueInvoicesThisYear?: Maybe<Scalars['Float']['output']>;
  percentageIncreaseInPendingInvoiceThisYear?: Maybe<Scalars['Float']['output']>;
  percentageOfInvoicesPaidForYear?: Maybe<Scalars['Float']['output']>;
  totalInvoiceAmountForYear?: Maybe<Scalars['Float']['output']>;
  totalOverdueInvoiceAmountThisYear?: Maybe<Scalars['Float']['output']>;
  totalPendingInvoiceAmountThisYear?: Maybe<Scalars['Float']['output']>;
};

export type TotalYearlyExpense = {
  __typename?: 'TotalYearlyExpense';
  percentageIncreaseInExpensesThisYear?: Maybe<Scalars['Float']['output']>;
  percentageOfExpenseToInvoiceThisYear: Scalars['Float']['output'];
  totalExpenseAmountThisYear: Scalars['Float']['output'];
};

export type TwoFactorAuthResponse = {
  __typename?: 'TwoFactorAuthResponse';
  otpAuthUrl: Scalars['String']['output'];
  secret: Scalars['String']['output'];
};

export type TwoFactorLoginResponse = {
  __typename?: 'TwoFactorLoginResponse';
  access_token: Scalars['String']['output'];
  email: Scalars['String']['output'];
};

export type UpdateAccountCategory = {
  description?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateAccountCategoryType = {
  accountCategoryId?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateAddOnOption = {
  addOnName?: InputMaybe<Scalars['String']['input']>;
  addOnPrice?: InputMaybe<Scalars['Float']['input']>;
};

export type UpdateBillingPlan = {
  planName?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateBusiness = {
  businessCategoryId?: InputMaybe<Scalars['String']['input']>;
  businessEmail?: InputMaybe<Scalars['String']['input']>;
  businessMobile?: InputMaybe<Scalars['String']['input']>;
  businessName?: InputMaybe<Scalars['String']['input']>;
  logo?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateBusinessCoa = {
  accountCategoryTypeId?: InputMaybe<Scalars['String']['input']>;
  code?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateBusinessCategory = {
  categoryName?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateBusinessProductUnit = {
  productUnitId: Scalars['String']['input'];
  unitName: Scalars['String']['input'];
};

export type UpdateBusinessServiceUnit = {
  serviceUnitId: Scalars['String']['input'];
  unitName: Scalars['String']['input'];
};

export type UpdateCategory = {
  businessId?: InputMaybe<Scalars['String']['input']>;
  categoryName?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateChartOfAccount = {
  accountCategoryTypeId?: InputMaybe<Scalars['String']['input']>;
  code?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateCompleteInvoiceB = {
  VAT?: InputMaybe<Scalars['Float']['input']>;
  customerId?: InputMaybe<Scalars['String']['input']>;
  dateOfIssue?: InputMaybe<Scalars['Date']['input']>;
  discount?: InputMaybe<Scalars['Float']['input']>;
  dueDate?: InputMaybe<Scalars['Date']['input']>;
  item?: InputMaybe<Array<ItemDetail>>;
};

export type UpdateCustomer = {
  address?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  isArchived?: InputMaybe<Scalars['Boolean']['input']>;
  mobile?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateExpense = {
  description?: InputMaybe<Scalars['String']['input']>;
  expenseCategoryId?: InputMaybe<Scalars['String']['input']>;
  expenseDate?: InputMaybe<Scalars['Date']['input']>;
  expenseItem?: InputMaybe<Array<InputMaybe<ExpenseDetail>>>;
  merchantId?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateExpenseCategory = {
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateExpenseDetail = {
  creditAccountId: Scalars['String']['input'];
  description: Scalars['String']['input'];
  expenseItemId?: InputMaybe<Scalars['String']['input']>;
  index: Scalars['Float']['input'];
  quantity: Scalars['Float']['input'];
  unitPrice: Scalars['Float']['input'];
};

export type UpdateInvite = {
  email?: InputMaybe<Scalars['String']['input']>;
  fullname?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateInvoice = {
  businessId?: InputMaybe<Scalars['String']['input']>;
  customerId?: InputMaybe<Scalars['String']['input']>;
  totalAmount?: InputMaybe<Scalars['Float']['input']>;
};

export type UpdateItemDetail = {
  discount?: InputMaybe<Scalars['Float']['input']>;
  index: Scalars['Float']['input'];
  invoiceDetailId?: InputMaybe<Scalars['String']['input']>;
  itemId: Scalars['String']['input'];
  price: Scalars['Float']['input'];
  quantity: Scalars['Float']['input'];
  type: Scalars['String']['input'];
};

export type UpdateMerchant = {
  email?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateOffer = {
  description?: InputMaybe<Scalars['String']['input']>;
  discountAmount?: InputMaybe<Scalars['Float']['input']>;
  discountPercentage?: InputMaybe<Scalars['Int']['input']>;
  includePlanId?: InputMaybe<Scalars['String']['input']>;
  offerName?: InputMaybe<Scalars['String']['input']>;
  prerequisitePlanId?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateOption = {
  optionName?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateOptionIncluded = {
  optionId?: InputMaybe<Scalars['String']['input']>;
  planId?: InputMaybe<Scalars['String']['input']>;
};

export type UpdatePayment = {
  amount?: InputMaybe<Scalars['Float']['input']>;
  dateReceived?: InputMaybe<Scalars['Date']['input']>;
  paymentMethod?: InputMaybe<Scalars['String']['input']>;
  remarks?: InputMaybe<Scalars['String']['input']>;
};

export type UpdatePlan = {
  currentPrice?: InputMaybe<Scalars['Float']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  optionData: Array<OptionData>;
  planName?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateProduct = {
  categoryId?: InputMaybe<Scalars['String']['input']>;
  image?: InputMaybe<Scalars['String']['input']>;
  isArchived?: InputMaybe<Scalars['Boolean']['input']>;
  price?: InputMaybe<Scalars['Float']['input']>;
  productName?: InputMaybe<Scalars['String']['input']>;
  productUnitId?: InputMaybe<Scalars['String']['input']>;
  reorderLevel?: InputMaybe<Scalars['Float']['input']>;
  trackReorderLevel?: InputMaybe<Scalars['Boolean']['input']>;
};

export type UpdateProductInvoiceDetail = {
  Price?: InputMaybe<Scalars['Float']['input']>;
  quantity?: InputMaybe<Scalars['Float']['input']>;
};

export type UpdateProductSaleItem = {
  price?: InputMaybe<Scalars['Float']['input']>;
  pricePerUnit?: InputMaybe<Scalars['Float']['input']>;
  quantitySold?: InputMaybe<Scalars['Float']['input']>;
  tax?: InputMaybe<Scalars['Float']['input']>;
};

export type UpdateProductUnit = {
  isArchived?: InputMaybe<Scalars['Boolean']['input']>;
  unitName?: InputMaybe<Scalars['String']['input']>;
};

export type UpdatePurchase = {
  description?: InputMaybe<Scalars['String']['input']>;
  merchantId?: InputMaybe<Scalars['String']['input']>;
  purchaseItem?: InputMaybe<Array<PurchaseItemDetail>>;
  transactionDate?: InputMaybe<Scalars['Date']['input']>;
};

export type UpdateRole = {
  roleDescription?: InputMaybe<Scalars['String']['input']>;
  roleName?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateSale = {
  paidAt?: InputMaybe<Scalars['Date']['input']>;
  saleAmount?: InputMaybe<Scalars['Float']['input']>;
  saleAmountPaid?: InputMaybe<Scalars['Float']['input']>;
  saleStatusId?: InputMaybe<Scalars['String']['input']>;
  tax?: InputMaybe<Scalars['Float']['input']>;
};

export type UpdateSaleEntry = {
  description?: InputMaybe<Scalars['String']['input']>;
  saleExpense?: InputMaybe<Array<SaleExpenseItem>>;
  saleServiceExpense?: InputMaybe<Array<SaleServiceExpenseEntry>>;
  updateInvoiceInput: UpdateCompleteInvoiceB;
};

export type UpdateSaleStatus = {
  statusName?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateService = {
  categoryId?: InputMaybe<Scalars['String']['input']>;
  isArchived?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  price?: InputMaybe<Scalars['Float']['input']>;
  serviceUnitId?: InputMaybe<Scalars['String']['input']>;
  tax?: InputMaybe<Scalars['Float']['input']>;
};

export type UpdateServiceInvoiceDetail = {
  price?: InputMaybe<Scalars['Float']['input']>;
};

export type UpdateServiceSaleItem = {
  price?: InputMaybe<Scalars['Float']['input']>;
  tax?: InputMaybe<Scalars['Float']['input']>;
};

export type UpdateServiceUnit = {
  isArchived?: InputMaybe<Scalars['Boolean']['input']>;
  unitName?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateSettlementAccount = {
  accountName?: InputMaybe<Scalars['String']['input']>;
  accountNumber?: InputMaybe<Scalars['String']['input']>;
  bankName?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateSubscription = {
  currentPlanId?: InputMaybe<Scalars['String']['input']>;
  offerId?: InputMaybe<Scalars['String']['input']>;
  subscribeAfterTrial?: InputMaybe<Scalars['Boolean']['input']>;
  validTo?: InputMaybe<Scalars['Date']['input']>;
};

export type UpdateUser = {
  email?: InputMaybe<Scalars['String']['input']>;
  fullname?: InputMaybe<Scalars['String']['input']>;
  newPassword?: InputMaybe<Scalars['String']['input']>;
  oldPassword?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateWaitlist = {
  email?: InputMaybe<Scalars['String']['input']>;
  fullname?: InputMaybe<Scalars['String']['input']>;
  mobile?: InputMaybe<Scalars['String']['input']>;
};

export type UploadMerchantInvoice = {
  businessId: Scalars['String']['input'];
  expenseId: Scalars['String']['input'];
  file?: InputMaybe<Scalars['String']['input']>;
  invoiceDate: Scalars['Date']['input'];
  match: Scalars['Boolean']['input'];
};

export type UploadMerchantInvoiceToExpenseResponse = {
  __typename?: 'UploadMerchantInvoiceToExpenseResponse';
  expenseStatus: Scalars['Float']['output'];
  uploaded: Scalars['Boolean']['output'];
};

export type UploadMerchantInvoiceToPurchase = {
  businessId: Scalars['String']['input'];
  file?: InputMaybe<Scalars['String']['input']>;
  invoiceDate: Scalars['Date']['input'];
  match: Scalars['Boolean']['input'];
  purchaseId: Scalars['String']['input'];
};

export type UploadMerchantInvoiceToPurchaseResponse = {
  __typename?: 'UploadMerchantInvoiceToPurchaseResponse';
  purchaseStatus: Scalars['Float']['output'];
  uploaded: Scalars['Boolean']['output'];
};

export type User = {
  __typename?: 'User';
  business?: Maybe<Array<Maybe<Business>>>;
  code?: Maybe<Scalars['Float']['output']>;
  codeExpiry?: Maybe<Scalars['Date']['output']>;
  createdAt: Scalars['Date']['output'];
  email: Scalars['String']['output'];
  fullname: Scalars['String']['output'];
  hash: Scalars['String']['output'];
  hashedRt?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  role?: Maybe<Role>;
  roleId?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['Date']['output'];
  verified?: Maybe<Scalars['Boolean']['output']>;
};

export type UserBusiness = {
  __typename?: 'UserBusiness';
  business?: Maybe<Business>;
  businessId?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['Date']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['Date']['output']>;
  user?: Maybe<User>;
  userId?: Maybe<Scalars['String']['output']>;
};

export type UserInvite = {
  __typename?: 'UserInvite';
  business?: Maybe<Business>;
  businessId?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['Date']['output'];
  email: Scalars['String']['output'];
  fullname?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  role?: Maybe<Role>;
  roleId?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['Date']['output'];
};

export type UserWaitlist = {
  __typename?: 'UserWaitlist';
  createdAt: Scalars['Date']['output'];
  email: Scalars['String']['output'];
  fullname?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  mobile?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['Date']['output'];
};

export type VerificationResponse = {
  __typename?: 'VerificationResponse';
  message?: Maybe<Scalars['Boolean']['output']>;
};

export type WeeklySales = {
  __typename?: 'WeeklySales';
  cursorId?: Maybe<Scalars['String']['output']>;
  numberOfSalesThisWeek: Scalars['Float']['output'];
  salesThisWeek: Array<Maybe<Sale>>;
};

export type YearInvoiceAmounts = {
  __typename?: 'YearInvoiceAmounts';
  month: Scalars['String']['output'];
  totalInvoicesAmount?: Maybe<Scalars['Float']['output']>;
  totalPaidInvoicesAmount?: Maybe<Scalars['Float']['output']>;
  totalPendingInvoicesAmount?: Maybe<Scalars['Float']['output']>;
};

export type YearlySales = {
  __typename?: 'YearlySales';
  cursorId?: Maybe<Scalars['String']['output']>;
  numberOfSalesThisYear: Scalars['Float']['output'];
  salesThisYear: Array<Maybe<Sale>>;
};

export type CreateBusinessServiceUnitMutationVariables = Exact<{
  unitName: Scalars['String']['input'];
  businessId: Scalars['String']['input'];
}>;


export type CreateBusinessServiceUnitMutation = { __typename?: 'Mutation', createBusinessServiceUnit?: { __typename?: 'BusinessServiceUnit', unitName?: string | null } | null };

export type CreateBusinessProductUnitMutationVariables = Exact<{
  unitName: Scalars['String']['input'];
  businessId: Scalars['String']['input'];
}>;


export type CreateBusinessProductUnitMutation = { __typename?: 'Mutation', createBusinessProductUnit?: { __typename?: 'BusinessProductUnit', unitName?: string | null } | null };

export type GetCombinedProductUnitsQueryVariables = Exact<{
  businessId: Scalars['String']['input'];
}>;


export type GetCombinedProductUnitsQuery = { __typename?: 'Query', getCombinedProductUnits?: Array<{ __typename?: 'CombinedProductUnit', id?: string | null, unitName?: string | null } | null> | null };

export type GetCombinesServiceUnitsQueryVariables = Exact<{
  businessId: Scalars['String']['input'];
}>;


export type GetCombinesServiceUnitsQuery = { __typename?: 'Query', getCombinedServiceUnits?: Array<{ __typename?: 'CombinedServiceUnit', id?: string | null, unitName?: string | null } | null> | null };

export type ArchiveCustomerByBusinessMutationVariables = Exact<{
  customerId: Scalars['String']['input'];
}>;


export type ArchiveCustomerByBusinessMutation = { __typename?: 'Mutation', archiveCustomerByBusiness?: boolean | null };

export type ArchiveExpenseMutationVariables = Exact<{
  expenseId: Scalars['String']['input'];
}>;


export type ArchiveExpenseMutation = { __typename?: 'Mutation', archiveExpense?: boolean | null };

export type ArchiveProductByBusinessMutationVariables = Exact<{
  productId: Scalars['String']['input'];
}>;


export type ArchiveProductByBusinessMutation = { __typename?: 'Mutation', archiveProductByBusiness?: boolean | null };

export type ArchivePurchaseMutationVariables = Exact<{
  purchaseId: Scalars['String']['input'];
}>;


export type ArchivePurchaseMutation = { __typename?: 'Mutation', archivePurchase?: boolean | null };

export type ArchiveSaleMutationVariables = Exact<{
  saleId: Scalars['String']['input'];
}>;


export type ArchiveSaleMutation = { __typename?: 'Mutation', archiveSale?: boolean | null };

export type ArchiveServiceByBusinessMutationVariables = Exact<{
  serviceId: Scalars['String']['input'];
}>;


export type ArchiveServiceByBusinessMutation = { __typename?: 'Mutation', archiveServiceByBusiness?: boolean | null };

export type ChangePasswordMutationVariables = Exact<{
  forgotPasswordId: Scalars['String']['input'];
  newPassword: Scalars['String']['input'];
}>;


export type ChangePasswordMutation = { __typename?: 'Mutation', changePassword?: boolean | null };

export type CheckIfNewBusinessQueryVariables = Exact<{
  businessId: Scalars['String']['input'];
}>;


export type CheckIfNewBusinessQuery = { __typename?: 'Query', checkIfNewBusiness?: boolean | null };

export type VerificationMutationVariables = Exact<{
  code: Scalars['Float']['input'];
}>;


export type VerificationMutation = { __typename?: 'Mutation', verification?: boolean | null };

export type CreateAddOnOptionMutationVariables = Exact<{
  addOnName: Scalars['String']['input'];
  addOnPrice: Scalars['Float']['input'];
}>;


export type CreateAddOnOptionMutation = { __typename?: 'Mutation', createAddOnOption?: { __typename?: 'AddOnOption', id?: string | null, addOnName?: string | null, addOnPrice?: number | null, createdAt?: any | null } | null };

export type CreateBusinessMutationVariables = Exact<{
  businessName: Scalars['String']['input'];
  businessEmail: Scalars['String']['input'];
  businessMobile: Scalars['String']['input'];
  businessCategoryId: Scalars['String']['input'];
}>;


export type CreateBusinessMutation = { __typename?: 'Mutation', createBusiness?: { __typename?: 'Business', id: string, businessName: string, businessEmail?: string | null, businessMobile?: string | null } | null };

export type CreateNewBusinessCoaMutationVariables = Exact<{
  code: Scalars['String']['input'];
  name: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  accountCategoryTypeId: Scalars['String']['input'];
  businessId: Scalars['String']['input'];
}>;


export type CreateNewBusinessCoaMutation = { __typename?: 'Mutation', createBusinessCOA?: { __typename?: 'BusinessChartOfAccount', id?: string | null, code?: string | null, name?: string | null, createdAt?: any | null } | null };

export type CreateCustomerMutationVariables = Exact<{
  name: Scalars['String']['input'];
  address?: InputMaybe<Scalars['String']['input']>;
  mobile: Scalars['String']['input'];
  email: Scalars['String']['input'];
  businessId: Scalars['String']['input'];
}>;


export type CreateCustomerMutation = { __typename?: 'Mutation', createCustomer?: { __typename?: 'Customer', id: string, name: string, address?: string | null, mobile: string, email: string, createdAt?: any | null, business?: { __typename?: 'Business', businessName: string, businessEmail?: string | null, businessMobile?: string | null } | null } | null };

export type CreateCustomerWithCsvMutationVariables = Exact<{
  businessId: Scalars['String']['input'];
  csvFile: Scalars['Any']['input'];
}>;


export type CreateCustomerWithCsvMutation = { __typename?: 'Mutation', createCustomerWithCsv?: boolean | null };

export type CreateExpenseMutationVariables = Exact<{
  description: Scalars['String']['input'];
  expenseCategoryId?: InputMaybe<Scalars['String']['input']>;
  businessId: Scalars['String']['input'];
  expenseDate: Scalars['Date']['input'];
  merchantId: Scalars['String']['input'];
  recurring?: InputMaybe<Scalars['Boolean']['input']>;
  expenseItem: Array<ExpenseDetail> | ExpenseDetail;
}>;


export type CreateExpenseMutation = { __typename?: 'Mutation', createExpense?: { __typename?: 'Expense', id: string, description?: string | null, reference?: string | null, amount: number, expenseDate?: any | null, createdAt: any } | null };

export type CreateCompleteExpenseWithCsvMutationVariables = Exact<{
  businessId: Scalars['String']['input'];
  csvFile: Scalars['Any']['input'];
}>;


export type CreateCompleteExpenseWithCsvMutation = { __typename?: 'Mutation', createCompletedExpenseWithCsv?: boolean | null };

export type CreateMerchantMutationVariables = Exact<{
  name: Scalars['String']['input'];
  businessId: Scalars['String']['input'];
  email: Scalars['String']['input'];
}>;


export type CreateMerchantMutation = { __typename?: 'Mutation', createMerchant?: { __typename?: 'Merchant', id?: string | null, name: string, email?: string | null } | null };

export type CreateProductMutationVariables = Exact<{
  productName: Scalars['String']['input'];
  businessId: Scalars['String']['input'];
  price: Scalars['Float']['input'];
  productUnitId: Scalars['String']['input'];
  initialStockLevel?: InputMaybe<Scalars['Float']['input']>;
}>;


export type CreateProductMutation = { __typename?: 'Mutation', createProduct: { __typename?: 'Product', id: string, productName: string, price?: number | null, productUnitId?: string | null, businessProductUnitId?: string | null, isArchived?: boolean | null, createdAt?: any | null } };

export type CreateProductWithCsvMutationVariables = Exact<{
  businessId: Scalars['String']['input'];
  csvFile: Scalars['Any']['input'];
}>;


export type CreateProductWithCsvMutation = { __typename?: 'Mutation', createProductsWithCsv?: boolean | null };

export type CreatePurchaseEntryMutationVariables = Exact<{
  transactionDate: Scalars['Date']['input'];
  description: Scalars['String']['input'];
  merchantId: Scalars['String']['input'];
  businessId: Scalars['String']['input'];
  purchaseItem: Array<PurchaseItemDetail> | PurchaseItemDetail;
}>;


export type CreatePurchaseEntryMutation = { __typename?: 'Mutation', createPurchaseEntry?: { __typename?: 'Purchase', id?: string | null, description?: string | null, reference?: string | null, transactionDate?: any | null, businessId?: string | null, createdAt?: any | null } | null };

export type CreateCompletedPurchaseWithCsvMutationVariables = Exact<{
  businessId: Scalars['String']['input'];
  csvFile: Scalars['Any']['input'];
}>;


export type CreateCompletedPurchaseWithCsvMutation = { __typename?: 'Mutation', createCompletedPurchaseWithCsv?: boolean | null };

export type CreateSaleEntryMutationVariables = Exact<{
  description: Scalars['String']['input'];
  invoiceInput: CreateCompleteInvoiceB;
  saleExpense?: InputMaybe<Array<SaleExpenseItem> | SaleExpenseItem>;
  saleServiceExpense?: InputMaybe<Array<SaleServiceExpenseEntry> | SaleServiceExpenseEntry>;
}>;


export type CreateSaleEntryMutation = { __typename?: 'Mutation', createSaleEntry?: { __typename?: 'Sale', id: string, description?: string | null, saleAmount?: number | null, transactionDate?: any | null, saleStatusId?: number | null, invoice?: { __typename?: 'Invoice', id: string, reference: string, subtotal: number, totalAmount: number } | null } | null };

export type CreateServiceMutationVariables = Exact<{
  name: Scalars['String']['input'];
  price: Scalars['Float']['input'];
  businessId: Scalars['String']['input'];
  serviceUnitId: Scalars['String']['input'];
}>;


export type CreateServiceMutation = { __typename?: 'Mutation', createService?: { __typename?: 'Service', id: string, name: string, price: number, businessId: string, serviceUnitId?: string | null, isArchived?: boolean | null, createdAt?: any | null } | null };

export type CreateServiceWithCsvMutationVariables = Exact<{
  businessId: Scalars['String']['input'];
  csvFile: Scalars['Any']['input'];
}>;


export type CreateServiceWithCsvMutation = { __typename?: 'Mutation', createServicesWithCsv?: boolean | null };

export type CreateSubscriptionMutationVariables = Exact<{
  businessId: Scalars['String']['input'];
  currentPlanId: Scalars['String']['input'];
  offerId?: InputMaybe<Scalars['String']['input']>;
  addOnOptionId?: InputMaybe<Scalars['String']['input']>;
  addOnQuantity?: InputMaybe<Scalars['Float']['input']>;
  tax: Scalars['Float']['input'];
  cardNumber: Scalars['String']['input'];
  cardCVV: Scalars['String']['input'];
  cardType?: InputMaybe<Scalars['String']['input']>;
  cardExpiry: Scalars['String']['input'];
  cardPin: Scalars['String']['input'];
  billingAddress?: InputMaybe<Scalars['String']['input']>;
}>;


export type CreateSubscriptionMutation = { __typename?: 'Mutation', createSubscription?: { __typename?: 'Subscription', id: string, dateSubscribed: any, validTo: any, business?: { __typename?: 'Business', businessName: string } | null, subscriptionInvoice?: Array<{ __typename?: 'SubscriptionInvoice', invoiceDescription?: string | null, invoiceTotal?: number | null, invoicePaid?: any | null } | null> | null } | null };

export type DeleteProductMutationVariables = Exact<{
  productId: Scalars['String']['input'];
}>;


export type DeleteProductMutation = { __typename?: 'Mutation', deleteProduct?: boolean | null };

export type DeleteAddOnOptionMutationVariables = Exact<{
  addOnOptionId: Scalars['String']['input'];
}>;


export type DeleteAddOnOptionMutation = { __typename?: 'Mutation', deleteAddOnOption?: boolean | null };

export type DeleteCustomerMutationVariables = Exact<{
  customerId: Scalars['String']['input'];
}>;


export type DeleteCustomerMutation = { __typename?: 'Mutation', deleteCustomer?: boolean | null };

export type DeleteExpenseMutationVariables = Exact<{
  expenseId: Scalars['String']['input'];
}>;


export type DeleteExpenseMutation = { __typename?: 'Mutation', deleteExpense?: boolean | null };

export type DeletePurchaseMutationVariables = Exact<{
  purchaseId: Scalars['String']['input'];
}>;


export type DeletePurchaseMutation = { __typename?: 'Mutation', deletePurchase?: boolean | null };

export type DeleteSaleMutationVariables = Exact<{
  saleId: Scalars['String']['input'];
}>;


export type DeleteSaleMutation = { __typename?: 'Mutation', deleteSale?: boolean | null };

export type DeleteServiceMutationVariables = Exact<{
  serviceId: Scalars['String']['input'];
}>;


export type DeleteServiceMutation = { __typename?: 'Mutation', deleteService?: boolean | null };

export type EffectSaleExpenseMutationVariables = Exact<{
  expenseId: Scalars['String']['input'];
  description: Scalars['String']['input'];
  transactionDate: Scalars['Date']['input'];
  file?: InputMaybe<Scalars['String']['input']>;
}>;


export type EffectSaleExpenseMutation = { __typename?: 'Mutation', effectSaleExpense: { __typename?: 'EffectSaleExpenseResponse', effected: boolean, saleStatus: number } };

export type GetCombinedCoAsQueryVariables = Exact<{
  businessId: Scalars['String']['input'];
}>;


export type GetCombinedCoAsQuery = { __typename?: 'Query', getCombinedCOAs?: Array<{ __typename?: 'CombinedChartOfAccount', id: string, name: string } | null> | null };

export type UploadMutationVariables = Exact<{
  image: Scalars['Any']['input'];
}>;


export type UploadMutation = { __typename?: 'Mutation', uploadFile?: boolean | null };

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String']['input'];
}>;


export type ForgotPasswordMutation = { __typename?: 'Mutation', forgotPassword?: boolean | null };

export type GetAddOnOptionsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAddOnOptionsQuery = { __typename?: 'Query', getAddOnOptions: Array<{ __typename?: 'AddOnOption', id?: string | null, addOnName?: string | null, addOnPrice?: number | null } | null> };

export type GetBusinessCoaByBusinessQueryVariables = Exact<{
  businessId: Scalars['String']['input'];
}>;


export type GetBusinessCoaByBusinessQuery = { __typename?: 'Query', getBusinessCOAByBusiness: Array<{ __typename?: 'BusinessChartOfAccount', id?: string | null, name?: string | null, code?: string | null } | null> };

export type GetBusinessByIdQueryVariables = Exact<{
  businessId: Scalars['String']['input'];
}>;


export type GetBusinessByIdQuery = { __typename?: 'Query', getBusinessById?: { __typename?: 'Business', id: string, businessName: string, businessEmail?: string | null, businessMobile?: string | null, createdAt?: any | null, businessCategory?: { __typename?: 'BusinessCategory', categoryName: string } | null } | null };

export type GetBusinessesByUserIdQueryVariables = Exact<{ [key: string]: never; }>;


export type GetBusinessesByUserIdQuery = { __typename?: 'Query', getBusinessesByUserId?: { __typename?: 'GetBusinessByUser', user?: { __typename?: 'User', id: string, email: string, fullname: string, verified?: boolean | null } | null, businesses?: Array<{ __typename?: 'Business', id: string, businessName: string, businessEmail?: string | null, businessMobile?: string | null } | null> | null } | null };

export type GetBusinessCoAsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetBusinessCoAsQuery = { __typename?: 'Query', getBusinessCOAs: Array<{ __typename?: 'BusinessChartOfAccount', id?: string | null, name?: string | null, code?: string | null, createdAt?: any | null } | null> };

export type GetBusinessCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetBusinessCategoriesQuery = { __typename?: 'Query', getBusinessCategories: Array<{ __typename?: 'BusinessCategory', id: string, categoryName: string, createdAt?: any | null } | null> };

export type GetBusinessProductUnitsQueryVariables = Exact<{
  businessId: Scalars['String']['input'];
}>;


export type GetBusinessProductUnitsQuery = { __typename?: 'Query', getBusinessProductUnits?: Array<{ __typename?: 'BusinessProductUnit', id?: string | null, unitName?: string | null } | null> | null };

export type GetChartOfAccountsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetChartOfAccountsQuery = { __typename?: 'Query', getChartOfAccounts: Array<{ __typename?: 'ChartOfAccount', id?: string | null, name?: string | null, code?: string | null, createdAt?: any | null } | null> };

export type GetCustomerByIdQueryVariables = Exact<{
  customerId: Scalars['String']['input'];
}>;


export type GetCustomerByIdQuery = { __typename?: 'Query', getCustomerById?: { __typename?: 'Customer', id: string, name: string, address?: string | null, mobile: string, email: string } | null };

export type GetCustomersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCustomersQuery = { __typename?: 'Query', getCustomers: Array<{ __typename?: 'Customer', id: string, name: string, mobile: string, email: string, address?: string | null } | null> };

export type GetCustomerByBusinessQueryVariables = Exact<{
  businessId: Scalars['String']['input'];
  cursor?: InputMaybe<Scalars['String']['input']>;
  sets?: InputMaybe<Scalars['Float']['input']>;
}>;


export type GetCustomerByBusinessQuery = { __typename?: 'Query', getCustomerByBusiness?: { __typename?: 'GetCustomerResponse', cursorId?: string | null, customerByBusiness: Array<{ __typename?: 'Customer', id: string, name: string, email: string, mobile: string, createdAt?: any | null, address?: string | null, isArchived?: boolean | null, invoices?: Array<{ __typename?: 'Invoice', totalAmount: number, createdAt?: any | null } | null> | null } | null> } | null };

export type GetDailyExpensesForMonthQueryVariables = Exact<{
  businessId: Scalars['String']['input'];
  month: Scalars['Float']['input'];
  year: Scalars['Float']['input'];
}>;


export type GetDailyExpensesForMonthQuery = { __typename?: 'Query', getDailyExpensesForMonth?: Array<{ __typename?: 'DailyExpense', expenseDate: any, totalExpenses: number } | null> | null };

export type GetExpenseByIdQueryVariables = Exact<{
  expenseId: Scalars['String']['input'];
}>;


export type GetExpenseByIdQuery = { __typename?: 'Query', getExpenseById?: { __typename?: 'Expense', id: string, description?: string | null, amount: number, expenseDate?: any | null, paid?: boolean | null, createdAt: any, expenseStatusId?: number | null, merchant?: { __typename?: 'Merchant', name: string, email?: string | null, id?: string | null } | null, expenseCategory?: { __typename?: 'ExpenseCategory', name: string, id: string } | null, expenseItems?: Array<{ __typename?: 'ExpenseItem', id?: string | null, quantityReceived?: number | null, received?: boolean | null, description?: string | null, quantity?: number | null, unitPrice?: number | null, index?: number | null, price?: number | null, chartOfAccount?: { __typename?: 'ChartOfAccount', name?: string | null, id?: string | null } | null } | null> | null, expenseLines?: Array<{ __typename?: 'ExpenseLine', lineAmount: number, lineQuantity?: number | null, id?: string | null, chartOfAccount?: { __typename?: 'ChartOfAccount', name?: string | null } | null } | null> | null } | null };

export type GetExpenseCategoryWithSetsQueryVariables = Exact<{
  cursor?: InputMaybe<Scalars['String']['input']>;
  sets?: InputMaybe<Scalars['Float']['input']>;
}>;


export type GetExpenseCategoryWithSetsQuery = { __typename?: 'Query', getExpenseCategoryWithSets?: { __typename?: 'GetExpenseCategoryResponse', cursorId?: string | null, expenseCategories: Array<{ __typename?: 'ExpenseCategory', id: string, name: string } | null> } | null };

export type GetExpenseForMonthQueryVariables = Exact<{
  businessId: Scalars['String']['input'];
  monthly?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type GetExpenseForMonthQuery = { __typename?: 'Query', getExpensesForMonth?: { __typename?: 'TotalMonthlyExpense', totalExpenseAmountThisMonth: number, percentageOfExpenseToInvoiceThisMonth: number, percentageIncreaseInExpenseThisMonth?: number | null } | null };

export type GetExpenseForQuarterQueryVariables = Exact<{
  businessId: Scalars['String']['input'];
  quarterly?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type GetExpenseForQuarterQuery = { __typename?: 'Query', getExpensesForQuarter?: { __typename?: 'TotalQuarterlyExpense', totalExpenseAmountThisQuarter: number, percentageOfExpenseToInvoiceThisQuarter: number, percentageIncreaseInExpensesThisQuarter?: number | null } | null };

export type GetExpenseForWeekQueryVariables = Exact<{
  businessId: Scalars['String']['input'];
  weekly?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type GetExpenseForWeekQuery = { __typename?: 'Query', getExpensesForWeek?: { __typename?: 'TotalWeeklyExpense', totalExpenseAmountThisWeek: number, percentageOfExpenseToInvoiceThisWeek: number, percentageIncreaseInExpenseThisWeek?: number | null } | null };

export type GetExpenseForYearQueryVariables = Exact<{
  businessId: Scalars['String']['input'];
  yearly?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type GetExpenseForYearQuery = { __typename?: 'Query', getExpensesForYear?: { __typename?: 'TotalYearlyExpense', totalExpenseAmountThisYear: number, percentageOfExpenseToInvoiceThisYear: number, percentageIncreaseInExpensesThisYear?: number | null } | null };

export type GetExpensesByBusinessQueryVariables = Exact<{
  businessId: Scalars['String']['input'];
  sets?: InputMaybe<Scalars['Float']['input']>;
  cursor?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetExpensesByBusinessQuery = { __typename?: 'Query', getExpenseByBusiness?: { __typename?: 'GetExpenseResponse', cursorId?: string | null, expenseByBusiness: Array<{ __typename?: 'Expense', id: string, description?: string | null, amount: number, paid?: boolean | null, archived?: boolean | null, expenseDate?: any | null, recurring?: boolean | null, expenseCategory?: { __typename?: 'ExpenseCategory', name: string, id: string } | null, business?: { __typename?: 'Business', businessName: string } | null, merchant?: { __typename?: 'Merchant', name: string, id?: string | null } | null } | null> } | null };

export type GetExpenseByBusinessMobileQueryVariables = Exact<{
  businessId: Scalars['String']['input'];
  cursor?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Float']['input']>;
}>;


export type GetExpenseByBusinessMobileQuery = { __typename?: 'Query', getExpenseByBusinessMobile?: { __typename?: 'GetExpenseResponse', cursorId?: string | null, expenseByBusiness: Array<{ __typename?: 'Expense', id: string, description?: string | null, amount: number, expenseDate?: any | null } | null> } | null };

export type GetInvoicesByBusinessQueryVariables = Exact<{
  businessId: Scalars['String']['input'];
  cursor?: InputMaybe<Scalars['String']['input']>;
  sets?: InputMaybe<Scalars['Float']['input']>;
}>;


export type GetInvoicesByBusinessQuery = { __typename?: 'Query', getInvoiceByBusiness?: { __typename?: 'GetInvoiceByBusinessResponse', cursorId?: string | null, invoicesByBusiness: Array<{ __typename?: 'Invoice', id: string, totalAmount: number, createdAt?: any | null, subtotal: number, VAT?: number | null, discount?: number | null, dateOfIssue?: any | null, dueDate?: any | null, customer?: { __typename?: 'Customer', id: string, name: string, email: string, address?: string | null } | null, business?: { __typename?: 'Business', id: string, businessName: string, businessEmail?: string | null } | null, invoiceDetails?: Array<{ __typename?: 'InvoiceDetail', id: string, type: string, cost: number, index?: number | null, productInvoiceDetail?: { __typename?: 'ProductInvoiceDetail', type: string, unitPrice: number, quantity: number, price: number, product?: { __typename?: 'Product', id: string, type?: string | null, productName: string, price?: number | null, productUnit?: { __typename?: 'ProductUnit', id?: string | null, unitName?: string | null } | null } | null } | null, serviceInvoiceDetail?: { __typename?: 'ServiceInvoiceDetail', type: string, unitPrice?: number | null, quantity?: number | null, price: number, service?: { __typename?: 'Service', id: string, type?: string | null, name: string, price: number, serviceUnit?: { __typename?: 'ServiceUnit', id?: string | null, unitName?: string | null } | null } | null } | null } | null> | null } | null> } | null };

export type GetInvoiceByIdQueryVariables = Exact<{
  invoiceId: Scalars['String']['input'];
}>;


export type GetInvoiceByIdQuery = { __typename?: 'Query', getInvoiceById?: { __typename?: 'Invoice', id: string, subtotal: number, totalAmount: number, discount?: number | null, dueDate?: any | null, dateOfIssue?: any | null, paidFully?: boolean | null, VAT?: number | null, customer?: { __typename?: 'Customer', id: string, name: string, email: string, mobile: string, address?: string | null } | null, invoiceDetails?: Array<{ __typename?: 'InvoiceDetail', id: string, type: string, cost: number, index?: number | null, productInvoiceDetail?: { __typename?: 'ProductInvoiceDetail', type: string, unitPrice: number, quantity: number, price: number, product?: { __typename?: 'Product', id: string, type?: string | null, productName: string, price?: number | null, productUnit?: { __typename?: 'ProductUnit', id?: string | null, unitName?: string | null } | null } | null } | null, serviceInvoiceDetail?: { __typename?: 'ServiceInvoiceDetail', type: string, unitPrice?: number | null, quantity?: number | null, price: number, service?: { __typename?: 'Service', id: string, type?: string | null, name: string, price: number, serviceUnit?: { __typename?: 'ServiceUnit', id?: string | null, unitName?: string | null } | null } | null } | null } | null> | null } | null };

export type GetMerchantsByBusinessQueryVariables = Exact<{
  businessId: Scalars['String']['input'];
}>;


export type GetMerchantsByBusinessQuery = { __typename?: 'Query', getMerchantsByBusiness: Array<{ __typename?: 'Merchant', id?: string | null, name: string, email?: string | null, createdAt?: any | null, business?: { __typename?: 'Business', id: string, businessName: string } | null } | null> };

export type NumberOfCustomersThisMonthQueryVariables = Exact<{
  businessId: Scalars['String']['input'];
  monthly?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type NumberOfCustomersThisMonthQuery = { __typename?: 'Query', numberOfCustomersThisMonth?: { __typename?: 'TotalCustomersThisMonth', customersThisMonth: number, totalCustomers: number } | null };

export type NumberOfCustomersThisQuarterQueryVariables = Exact<{
  businessId: Scalars['String']['input'];
  quarterly?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type NumberOfCustomersThisQuarterQuery = { __typename?: 'Query', numberOfCustomersThisQuarter?: { __typename?: 'TotalCustomersThisQuarter', customersThisQuarter: number, totalCustomers: number } | null };

export type NumberOfCustomersThisWeekQueryVariables = Exact<{
  businessId: Scalars['String']['input'];
  weekly?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type NumberOfCustomersThisWeekQuery = { __typename?: 'Query', numberOfCustomersThisWeek?: { __typename?: 'TotalCustomersThisWeek', customersThisWeek: number, totalCustomers: number } | null };

export type NumberOfCustomersThisYearQueryVariables = Exact<{
  businessId: Scalars['String']['input'];
  yearly?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type NumberOfCustomersThisYearQuery = { __typename?: 'Query', numberOfCustomersThisYear?: { __typename?: 'TotalCustomersThisYear', customersThisYear: number, totalCustomers: number } | null };

export type NumberOfInvoicesThisMonthQueryVariables = Exact<{
  businessId: Scalars['String']['input'];
  monthly?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type NumberOfInvoicesThisMonthQuery = { __typename?: 'Query', numberOfInvoicesThisMonth?: { __typename?: 'TotalInvoicesForMonth', invoicesThisMonth: number, totalInvoices: number } | null };

export type NumberOfInvoicesThisQuarterQueryVariables = Exact<{
  businessId: Scalars['String']['input'];
  quarterly?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type NumberOfInvoicesThisQuarterQuery = { __typename?: 'Query', numberOfInvoicesThisQuarter?: { __typename?: 'TotalInvoicesThisQuarter', invoicesThisQuarter: number, totalInvoices: number } | null };

export type NumberOfInvoicesThisWeekQueryVariables = Exact<{
  businessId: Scalars['String']['input'];
  weekly?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type NumberOfInvoicesThisWeekQuery = { __typename?: 'Query', numberOfInvoicesThisWeek?: { __typename?: 'TotalInvoicesForWeek', invoicesThisweek: number, totalInvoices: number } | null };

export type NumberOfInvoicesThisYearQueryVariables = Exact<{
  businessId: Scalars['String']['input'];
  yearly?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type NumberOfInvoicesThisYearQuery = { __typename?: 'Query', numberOfInvoicesThisYear?: { __typename?: 'TotalInvoicesThisYear', invoicesThisYear: number, totalInvoices: number } | null };

export type GetPlansQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPlansQuery = { __typename?: 'Query', getPlans: Array<{ __typename?: 'Plan', id: string, planName: string, currentPrice: number, isActive?: boolean | null, optionIncluded?: Array<{ __typename?: 'OptionIncluded', option?: { __typename?: 'Option', id: string, optionName: string } | null } | null> | null } | null> };

export type GetProductByIdQueryVariables = Exact<{
  productId: Scalars['String']['input'];
}>;


export type GetProductByIdQuery = { __typename?: 'Query', getProductById?: { __typename?: 'Product', productName: string, price?: number | null, productUnitId?: string | null, reorderLevel?: number | null, trackReorderLevel?: boolean | null, productUnit?: { __typename?: 'ProductUnit', unitName?: string | null } | null } | null };

export type GetProductOrServiceByBusinessQueryVariables = Exact<{
  businessId: Scalars['String']['input'];
  take?: InputMaybe<Scalars['Float']['input']>;
  cursor?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetProductOrServiceByBusinessQuery = { __typename?: 'Query', getProductOrServiceByBusiness?: { __typename?: 'GetProductOrServiceResponse', cursorId?: string | null, type?: string | null, productOrServiceByBusiness: Array<{ __typename?: 'ProductOrService', id: string, title: string, type: string, price?: number | null, isArchived?: boolean | null, createdAt?: any | null, product?: { __typename?: 'Product', productName: string, price?: number | null, id: string, type?: string | null, productUnit?: { __typename?: 'ProductUnit', id?: string | null, unitName?: string | null } | null } | null, service?: { __typename?: 'Service', name: string, price: number, serviceUnit?: { __typename?: 'ServiceUnit', id?: string | null, unitName?: string | null } | null } | null, business?: { __typename?: 'Business', businessName: string } | null } | null> } | null };

export type GetProductUnitsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetProductUnitsQuery = { __typename?: 'Query', getProductUnits: Array<{ __typename?: 'ProductUnit', id?: string | null, unitName?: string | null, createdAt?: any | null } | null> };

export type GetProductsByBusinessQueryVariables = Exact<{
  businessId: Scalars['String']['input'];
  cursor?: InputMaybe<Scalars['String']['input']>;
  sets?: InputMaybe<Scalars['Float']['input']>;
}>;


export type GetProductsByBusinessQuery = { __typename?: 'Query', getProductsByBusiness?: { __typename?: 'GetProductResponse', cursorId?: string | null, productByBusiness: Array<{ __typename?: 'Product', id: string, type?: string | null, productName: string, price?: number | null, stockStatus?: string | null, productUnitId?: string | null, isArchived?: boolean | null, businessId?: string | null, createdAt?: any | null, productUnit?: { __typename?: 'ProductUnit', unitName?: string | null } | null } | null> } | null };

export type GetProductForWeekQueryVariables = Exact<{
  businessId: Scalars['String']['input'];
  weekly?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type GetProductForWeekQuery = { __typename?: 'Query', getProductsForWeek?: { __typename?: 'GetProductForWeekResponse', productsThisWeek?: number | null, totalProductAmountThisWeek?: number | null, productsInStock?: number | null, productsOutOfStock?: number | null } | null };

export type GetPurchaseByBusinessMobileQueryVariables = Exact<{
  businessId: Scalars['String']['input'];
  cursor?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Float']['input']>;
}>;


export type GetPurchaseByBusinessMobileQuery = { __typename?: 'Query', getPurchaseByBusinessMobile?: { __typename?: 'GetPurchaseByBusinessResponse', cursorId?: string | null, purchaseByBusiness: Array<{ __typename?: 'Purchase', id?: string | null, description?: string | null, transactionDate?: any | null, total?: number | null, businessId?: string | null, purchaseItems?: Array<{ __typename?: 'PurchaseItem', description: string, quantity: number, unitPrice: number, price: number, product?: { __typename?: 'Product', productName: string, price?: number | null } | null } | null> | null } | null> } | null };

export type GetPurchasesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPurchasesQuery = { __typename?: 'Query', getPurchases: Array<{ __typename?: 'Purchase', id?: string | null, description?: string | null, transactionDate?: any | null, total?: number | null, businessId?: string | null, purchaseItems?: Array<{ __typename?: 'PurchaseItem', description: string, quantity: number, unitPrice: number, price: number, product?: { __typename?: 'Product', productName: string, price?: number | null } | null } | null> | null } | null> };

export type GetPurchaseByBusinessQueryVariables = Exact<{
  businessId: Scalars['String']['input'];
  cursor?: InputMaybe<Scalars['String']['input']>;
  sets?: InputMaybe<Scalars['Float']['input']>;
}>;


export type GetPurchaseByBusinessQuery = { __typename?: 'Query', getPurchaseByBusiness?: { __typename?: 'GetPurchaseByBusinessResponse', cursorId?: string | null, purchaseByBusiness: Array<{ __typename?: 'Purchase', id?: string | null, description?: string | null, transactionDate?: any | null, total?: number | null, businessId?: string | null, paid?: boolean | null, merchant?: { __typename?: 'Merchant', name: string } | null, business?: { __typename?: 'Business', businessName: string } | null, purchasePayments?: Array<{ __typename?: 'PurchasePayment', total?: number | null, file?: string | null, transactionDate?: any | null, description?: string | null } | null> | null, purchaseItems?: Array<{ __typename?: 'PurchaseItem', description: string, quantity: number, unitPrice: number, price: number, product?: { __typename?: 'Product', productName: string, price?: number | null } | null } | null> | null } | null> } | null };

export type GetPurchaseByIdQueryVariables = Exact<{
  purchaseId: Scalars['String']['input'];
}>;


export type GetPurchaseByIdQuery = { __typename?: 'Query', getPurchaseById?: { __typename?: 'Purchase', id?: string | null, description?: string | null, reference?: string | null, transactionDate?: any | null, deliveryDate?: any | null, total?: number | null, paid?: boolean | null, createdAt?: any | null, purchaseStatusId?: number | null, businessId?: string | null, merchant?: { __typename?: 'Merchant', name: string, email?: string | null, id?: string | null } | null, purchaseItems?: Array<{ __typename?: 'PurchaseItem', id?: string | null, quantityReceived?: number | null, archived?: boolean | null, received?: boolean | null, productId?: string | null, description: string, quantity: number, unitPrice: number, index: number, price: number, purchase?: { __typename?: 'Purchase', createdAt?: any | null, updatedAt?: any | null } | null, product?: { __typename?: 'Product', productName: string, price?: number | null, id: string, productUnit?: { __typename?: 'ProductUnit', unitName?: string | null } | null } | null } | null> | null, purchaseStatus?: { __typename?: 'PurchaseStatusRef', id?: number | null, purchaseStatus?: string | null } | null, purchaseLines?: Array<{ __typename?: 'PurchaseLine', id?: string | null, lineAmount: number, lineQuantity?: number | null, transactionDate: any } | null> | null } | null };

export type GetPurchaseForMonthQueryVariables = Exact<{
  businessId: Scalars['String']['input'];
  monthly?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type GetPurchaseForMonthQuery = { __typename?: 'Query', getPurchaseForMonth?: { __typename?: 'GetPurchaseForMonthResponse', purchasesThisMonth?: number | null, totalPurchaseAmountThisMonth?: number | null, pendingPurchasesThisMonth?: number | null, totalPendingPurchaseAmountThisMonth?: number | null, paidPurchasesThisMonth?: number | null, totalPaidPurchaseAmountThisMonth?: number | null } | null };

export type GetPurchaseForQuarterQueryVariables = Exact<{
  businessId: Scalars['String']['input'];
  quarterly?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type GetPurchaseForQuarterQuery = { __typename?: 'Query', getPurchaseForQuarter?: { __typename?: 'GetPurchaseForQuarterResponse', purchasesThisQuarter?: number | null, totalPurchaseAmountThisQuarter?: number | null, pendingpurchasesThisQuarter?: number | null, totalPendingPurchaseAmountThisQuarter?: number | null, paidPurchasesThisQuarter?: number | null, totalPaidPurchaseAmountThisQuarter?: number | null } | null };

export type GetPurchaseForWeekQueryVariables = Exact<{
  businessId: Scalars['String']['input'];
  weekly?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type GetPurchaseForWeekQuery = { __typename?: 'Query', getPurchasesForWeek?: { __typename?: 'GetPurchaseForWeekResponse', purchasesThisWeek?: number | null, totalPurchaseAmountThisWeek?: number | null, pendingPurchasesThisWeek?: number | null, totalPendingPurchaseAmountThisWeek?: number | null, paidPurchasesThisWeek?: number | null, totalPaidPurchaseAmountThisWeek?: number | null } | null };

export type GetPurchaseForYearQueryVariables = Exact<{
  businessId: Scalars['String']['input'];
  yearly?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type GetPurchaseForYearQuery = { __typename?: 'Query', getPurchaseForYear?: { __typename?: 'GetPurchaseForYearResponse', purchasesThisYear?: number | null, totalPurchaseAmountThisYear?: number | null, pendingPurchasesThisYear?: number | null, totalPendingPurchaseAmountThisYear?: number | null, paidPurchasesThisYear?: number | null, totalPaidPurchaseAmountThisYear?: number | null } | null };

export type GetSaleByBusinessQueryVariables = Exact<{
  businessId: Scalars['String']['input'];
  cursor?: InputMaybe<Scalars['String']['input']>;
  sets?: InputMaybe<Scalars['Float']['input']>;
}>;


export type GetSaleByBusinessQuery = { __typename?: 'Query', getSaleByBusiness?: { __typename?: 'GetSaleByBusinessResponse', cursorId?: string | null, salesByBusiness: Array<{ __typename?: 'Sale', id: string, description?: string | null, saleAmount?: number | null, paid?: boolean | null, transactionDate?: any | null, business?: { __typename?: 'Business', businessName: string } | null, invoice?: { __typename?: 'Invoice', id: string, totalAmount: number, createdAt?: any | null, VAT?: number | null, paidFully?: boolean | null, discount?: number | null, dateOfIssue?: any | null, dueDate?: any | null, customer?: { __typename?: 'Customer', id: string, name: string, email: string, address?: string | null } | null, business?: { __typename?: 'Business', id: string, businessName: string, businessEmail?: string | null } | null, invoiceDetails?: Array<{ __typename?: 'InvoiceDetail', id: string, index?: number | null, productInvoiceDetail?: { __typename?: 'ProductInvoiceDetail', unitPrice: number, quantity: number, product?: { __typename?: 'Product', type?: string | null, productName: string, productUnit?: { __typename?: 'ProductUnit', id?: string | null, unitName?: string | null } | null } | null } | null, serviceInvoiceDetail?: { __typename?: 'ServiceInvoiceDetail', unitPrice?: number | null, quantity?: number | null, service?: { __typename?: 'Service', type?: string | null, name: string, serviceUnit?: { __typename?: 'ServiceUnit', id?: string | null, unitName?: string | null } | null } | null } | null } | null> | null } | null } | null> } | null };

export type GetSaleByBusinessMobileQueryVariables = Exact<{
  businessId: Scalars['String']['input'];
  cursor?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Float']['input']>;
}>;


export type GetSaleByBusinessMobileQuery = { __typename?: 'Query', getSaleByBusinessMobile?: { __typename?: 'GetSaleByBusinessResponse', cursorId?: string | null, salesByBusiness: Array<{ __typename?: 'Sale', id: string, description?: string | null, saleAmount?: number | null, transactionDate?: any | null } | null> } | null };

export type GetSaleByIdQueryVariables = Exact<{
  saleId: Scalars['String']['input'];
}>;


export type GetSaleByIdQuery = { __typename?: 'Query', getSaleById?: { __typename?: 'Sale', id: string, description?: string | null, reference?: string | null, paid?: boolean | null, saleAmount?: number | null, transactionDate?: any | null, dueDate?: any | null, saleStatus?: { __typename?: 'SaleStatusRef', id?: number | null, saleStatus?: string | null } | null, saleExpenses?: Array<{ __typename?: 'SaleExpense', id?: string | null, index?: number | null, saleId?: string | null, description?: string | null, amount?: number | null, effected?: boolean | null } | null> | null, saleServiceExpenses?: Array<{ __typename?: 'SaleServiceExpense', id?: string | null, effected?: boolean | null, amount?: number | null, index?: number | null, service?: { __typename?: 'Service', name: string, id: string } | null } | null> | null, invoice?: { __typename?: 'Invoice', totalAmount: number, VAT?: number | null, id: string, createdAt?: any | null, subtotal: number, paidFully?: boolean | null, discount?: number | null, dateOfIssue?: any | null, dueDate?: any | null, customer?: { __typename?: 'Customer', id: string, name: string, email: string, address?: string | null, mobile: string } | null, business?: { __typename?: 'Business', id: string, businessName: string, businessEmail?: string | null } | null, invoiceDetails?: Array<{ __typename?: 'InvoiceDetail', id: string, type: string, cost: number, index?: number | null, productInvoiceDetail?: { __typename?: 'ProductInvoiceDetail', type: string, unitPrice: number, quantity: number, price: number, product?: { __typename?: 'Product', id: string, type?: string | null, productName: string, price?: number | null, productUnit?: { __typename?: 'ProductUnit', id?: string | null, unitName?: string | null } | null } | null } | null, serviceInvoiceDetail?: { __typename?: 'ServiceInvoiceDetail', type: string, unitPrice?: number | null, quantity?: number | null, price: number, service?: { __typename?: 'Service', id: string, type?: string | null, name: string, price: number, serviceUnit?: { __typename?: 'ServiceUnit', id?: string | null, unitName?: string | null } | null } | null } | null } | null> | null } | null } | null };

export type GetSalesForMonthQueryVariables = Exact<{
  businessId: Scalars['String']['input'];
  monthly?: InputMaybe<Scalars['Boolean']['input']>;
  cursor?: InputMaybe<Scalars['String']['input']>;
  sets?: InputMaybe<Scalars['Float']['input']>;
}>;


export type GetSalesForMonthQuery = { __typename?: 'Query', getSalesForMonth?: { __typename?: 'MonthlySales', numberOfSalesThisMonth: number, cursorId?: string | null, salesThisMonth: Array<{ __typename?: 'Sale', id: string, paidAt?: any | null, saleAmount?: number | null, invoice?: { __typename?: 'Invoice', customer?: { __typename?: 'Customer', name: string, email: string } | null } | null } | null> } | null };

export type GetSalesForQuarterQueryVariables = Exact<{
  businessId: Scalars['String']['input'];
  quarterly?: InputMaybe<Scalars['Boolean']['input']>;
  cursor?: InputMaybe<Scalars['String']['input']>;
  sets?: InputMaybe<Scalars['Float']['input']>;
}>;


export type GetSalesForQuarterQuery = { __typename?: 'Query', getSalesForQuarter?: { __typename?: 'QuarterlySales', numberOfSalesThisQuarter: number, cursorId?: string | null, salesThisQuarter: Array<{ __typename?: 'Sale', id: string, paidAt?: any | null, saleAmount?: number | null, invoice?: { __typename?: 'Invoice', customer?: { __typename?: 'Customer', name: string, email: string } | null } | null } | null> } | null };

export type GetSalesForWeekQueryVariables = Exact<{
  businessId: Scalars['String']['input'];
  weekly?: InputMaybe<Scalars['Boolean']['input']>;
  cursor?: InputMaybe<Scalars['String']['input']>;
  sets?: InputMaybe<Scalars['Float']['input']>;
}>;


export type GetSalesForWeekQuery = { __typename?: 'Query', getSalesForWeek?: { __typename?: 'WeeklySales', numberOfSalesThisWeek: number, cursorId?: string | null, salesThisWeek: Array<{ __typename?: 'Sale', id: string, paidAt?: any | null, saleAmount?: number | null, invoice?: { __typename?: 'Invoice', customer?: { __typename?: 'Customer', name: string, email: string } | null } | null } | null> } | null };

export type GetSalesForYearQueryVariables = Exact<{
  businessId: Scalars['String']['input'];
  yearly?: InputMaybe<Scalars['Boolean']['input']>;
  cursor?: InputMaybe<Scalars['String']['input']>;
  sets?: InputMaybe<Scalars['Float']['input']>;
}>;


export type GetSalesForYearQuery = { __typename?: 'Query', getSalesForYear?: { __typename?: 'YearlySales', numberOfSalesThisYear: number, cursorId?: string | null, salesThisYear: Array<{ __typename?: 'Sale', id: string, paidAt?: any | null, saleAmount?: number | null, invoice?: { __typename?: 'Invoice', customer?: { __typename?: 'Customer', name: string, email: string } | null } | null } | null> } | null };

export type GetServiceByIdQueryVariables = Exact<{
  serviceId: Scalars['String']['input'];
}>;


export type GetServiceByIdQuery = { __typename?: 'Query', getServiceById?: { __typename?: 'Service', name: string, price: number, serviceUnitId?: string | null, serviceUnit?: { __typename?: 'ServiceUnit', unitName?: string | null } | null } | null };

export type GetServiceForWeekQueryVariables = Exact<{
  businessId: Scalars['String']['input'];
  weekly?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type GetServiceForWeekQuery = { __typename?: 'Query', getServiceForWeek?: { __typename?: 'GetServiceForWeekResponse', servicesThisWeek?: number | null, totalServiceAmountThisWeek?: number | null } | null };

export type GetServiceUnitsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetServiceUnitsQuery = { __typename?: 'Query', getServiceUnits: Array<{ __typename?: 'ServiceUnit', id?: string | null, unitName?: string | null, createdAt?: any | null } | null> };

export type GetServiceByBusinessQueryVariables = Exact<{
  businessId: Scalars['String']['input'];
  cursor?: InputMaybe<Scalars['String']['input']>;
  sets?: InputMaybe<Scalars['Float']['input']>;
}>;


export type GetServiceByBusinessQuery = { __typename?: 'Query', getServiceByBusiness?: { __typename?: 'GetServiceResponse', cursorId?: string | null, serviceByBusiness: Array<{ __typename?: 'Service', id: string, name: string, price: number, type?: string | null, serviceUnitId?: string | null, businessId: string, isArchived?: boolean | null, createdAt?: any | null, serviceUnit?: { __typename?: 'ServiceUnit', unitName?: string | null } | null } | null> } | null };

export type GetSubscriptionByBusinessQueryVariables = Exact<{
  businessId: Scalars['String']['input'];
}>;


export type GetSubscriptionByBusinessQuery = { __typename?: 'Query', getSubscriptionByBusiness: Array<{ __typename?: 'Subscription', id: string, dateSubscribed: any, dateUnsubscribed?: any | null, validTo: any, business?: { __typename?: 'Business', businessName: string } | null, plan?: { __typename?: 'Plan', id: string, planName: string, currentPrice: number } | null, subscriptionInvoice?: Array<{ __typename?: 'SubscriptionInvoice', invoiceTotal?: number | null, invoicePaid?: any | null } | null> | null, subscriptionPayment?: { __typename?: 'SubscriptionPayment', amount?: number | null } | null } | null> };

export type GetSubscriptionInvoiceByBusinessQueryVariables = Exact<{
  businessId: Scalars['String']['input'];
}>;


export type GetSubscriptionInvoiceByBusinessQuery = { __typename?: 'Query', getSubscriptionInvoiceByBusiness: Array<{ __typename?: 'SubscriptionInvoice', id: string, tax?: number | null, invoicePaid?: any | null, invoiceTotal?: number | null, subscription?: { __typename?: 'Subscription', subscriptionPayment?: { __typename?: 'SubscriptionPayment', amount?: number | null } | null } | null } | null> };

export type TotalMonthlyInvoicesAmountQueryVariables = Exact<{
  businessId: Scalars['String']['input'];
  monthly?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type TotalMonthlyInvoicesAmountQuery = { __typename?: 'Query', totalMonthlyInvoicesAmount?: { __typename?: 'TotalMonthlyInvoiceAmount', totalInvoiceAmountForMonth?: number | null, percentageOfPaidInvoicesForMonth?: number | null, totalPendingInvoiceAmountThisMonth?: number | null, percentageIncreaseInPendingInvoiceThisMonth?: number | null, totalOverdueInvoiceAmountThisMonth?: number | null, percentageIncreaseInOverdueInvoicesThisMonth?: number | null, percentageIncreaseInInvoicesThisMonth?: number | null, dailyTotalAmountsForMonth: Array<{ __typename?: 'DailyInvoiceTotalAmounts', date: any, totalAmount: number, totalPendingAmount: number, totalPaidAmount: number } | null> } | null };

export type TotalQuarterlyInvoicesAmountQueryVariables = Exact<{
  businessId: Scalars['String']['input'];
  quarterly?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type TotalQuarterlyInvoicesAmountQuery = { __typename?: 'Query', totalQuarterlyInvoicesAmount?: { __typename?: 'TotalQuarterInvoiceAmounts', totalInvoiceAmountForQuarter?: number | null, percentageOfInvoicePaidForQuarter?: number | null, totalPendingInvoiceAmountThisQuarter?: number | null, percentageIncreaseInPendingInvoiceThisQuarter?: number | null, totalOverdueInvoiceAmountThisQuarter?: number | null, percentageIncreaseInOverdueInvoiceThisQuarter?: number | null, percentageIncreaseInInvoiceThisQuarter?: number | null, quarterInvoiceAmounts: Array<{ __typename?: 'QuarterInvoiceAmounts', month?: string | null, invoiceAmount?: number | null, invoicePending?: number | null, invoicePaid?: number | null } | null> } | null };

export type TotalWeeklyInvoicesAmountQueryVariables = Exact<{
  businessId: Scalars['String']['input'];
  weekly?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type TotalWeeklyInvoicesAmountQuery = { __typename?: 'Query', totalWeeklyInvoicesAmount?: { __typename?: 'TotalWeeklyInvoiceAmount', totalInvoiceAmountForWeek?: number | null, percentageOfPaidInvoices?: number | null, totalPendingInvoiceAmountThisWeek?: number | null, percentageIncreaseInPendingInvoiceThisWeek?: number | null, totalOverDueInvoiceAmountThisWeek?: number | null, percentageIncreaseInOverdueInvoicesThisWeek?: number | null, percentageOfIncreaseInInvoicesThisWeek?: number | null, dailyTotalAmounts: Array<{ __typename?: 'DailyInvoiceTotalAmounts', date: any, dayOfWeek?: string | null, totalAmount: number, totalPendingAmount: number, totalPaidAmount: number } | null> } | null };

export type TotalYearlyInvoicesAmountQueryVariables = Exact<{
  businessId: Scalars['String']['input'];
  yearly?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type TotalYearlyInvoicesAmountQuery = { __typename?: 'Query', totalYearlyInvoicesAmount?: { __typename?: 'TotalYearInvoiceAmounts', totalInvoiceAmountForYear?: number | null, percentageOfInvoicesPaidForYear?: number | null, totalPendingInvoiceAmountThisYear?: number | null, percentageIncreaseInPendingInvoiceThisYear?: number | null, totalOverdueInvoiceAmountThisYear?: number | null, percentageIncreaseInOverdueInvoicesThisYear?: number | null, percentageIncreaseInInvoiceThisYear?: number | null, monthlyTotalAmounts: Array<{ __typename?: 'YearInvoiceAmounts', month: string, totalInvoicesAmount?: number | null, totalPendingInvoicesAmount?: number | null, totalPaidInvoicesAmount?: number | null } | null> } | null };

export type GetUserByIdQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserByIdQuery = { __typename?: 'Query', getUserById: { __typename?: 'User', id: string, fullname: string, email: string } };

export type InvoiceAndExpenseGraphMonthlyQueryVariables = Exact<{
  businessId: Scalars['String']['input'];
  monthly?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type InvoiceAndExpenseGraphMonthlyQuery = { __typename?: 'Query', invoiceAndExpenseGraphMonthly?: Array<{ __typename?: 'InvoiceAndExpenseGraphMonthlyResponse', date?: any | null, totalAmount?: number | null, totalInvoiceAmount?: number | null, totalExpenseAmount?: number | null } | null> | null };

export type InvoiceAndExpenseGraphQuarterlyQueryVariables = Exact<{
  businessId: Scalars['String']['input'];
  quarterly?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type InvoiceAndExpenseGraphQuarterlyQuery = { __typename?: 'Query', invoiceAndExpenseGraphQuarterly?: Array<{ __typename?: 'InvoiceAndExpenseGraphQuarterlyResponse', month?: string | null, totalAmount?: number | null, invoiceAmount?: number | null, expenseAmount?: number | null } | null> | null };

export type InvoiceAndExpenseGraphWeeklyQueryVariables = Exact<{
  businessId: Scalars['String']['input'];
  weekly?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type InvoiceAndExpenseGraphWeeklyQuery = { __typename?: 'Query', invoiceAndExpenseGraphWeekly?: Array<{ __typename?: 'InvoiceAndExpenseGraphWeeklyResponse', date?: any | null, dayOfWeek?: string | null, total?: number | null, totalExpenseAmount?: number | null, totalInvoiceAmount?: number | null } | null> | null };

export type InvoiceAndExpenseGraphYearlyQueryVariables = Exact<{
  businessId: Scalars['String']['input'];
  yearly?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type InvoiceAndExpenseGraphYearlyQuery = { __typename?: 'Query', invoiceAndExpenseGraphYearly?: Array<{ __typename?: 'InvoiceAndExpenseGraphYearlyResponse', month?: string | null, totalAmount?: number | null, totalInvoicesAmount?: number | null, totalExpenseAmount?: number | null } | null> | null };

export type IsForgotPasswordLinkValidQueryVariables = Exact<{
  forgotPasswordId: Scalars['String']['input'];
}>;


export type IsForgotPasswordLinkValidQuery = { __typename?: 'Query', isForgotPasswordLinkValid: boolean };

export type LogOutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogOutMutation = { __typename?: 'Mutation', logOut?: boolean | null };

export type MakeExpensePaymentMutationVariables = Exact<{
  businessId: Scalars['String']['input'];
  expenseId: Scalars['String']['input'];
  transactionDate: Scalars['Date']['input'];
  description: Scalars['String']['input'];
  total: Scalars['Float']['input'];
  file?: InputMaybe<Scalars['String']['input']>;
}>;


export type MakeExpensePaymentMutation = { __typename?: 'Mutation', makeExpensePayment: { __typename?: 'MakePaymentForExpenseResponse', paid: boolean, expenseStatus: number } };

export type MakePurchasePaymentMutationVariables = Exact<{
  businessId: Scalars['String']['input'];
  purchaseId: Scalars['String']['input'];
  transactionDate: Scalars['Date']['input'];
  description: Scalars['String']['input'];
  total: Scalars['Float']['input'];
  file?: InputMaybe<Scalars['String']['input']>;
}>;


export type MakePurchasePaymentMutation = { __typename?: 'Mutation', makePurchasePayment: { __typename?: 'MakePurchasePaymentResponse', paid: boolean, purchaseStatus: number } };

export type MakeSalePaymentMutationVariables = Exact<{
  saleId: Scalars['String']['input'];
  transactionDate: Scalars['Date']['input'];
  description: Scalars['String']['input'];
  file?: InputMaybe<Scalars['String']['input']>;
}>;


export type MakeSalePaymentMutation = { __typename?: 'Mutation', makeSalePayment: { __typename?: 'MakeSalePaymentResponse', paid: boolean, saleStatus: number } };

export type MarkExpenseItemAsReceivedMutationVariables = Exact<{
  expenseItemId: Scalars['String']['input'];
  businessId: Scalars['String']['input'];
  quantity: Scalars['Float']['input'];
  transactionDate: Scalars['Date']['input'];
}>;


export type MarkExpenseItemAsReceivedMutation = { __typename?: 'Mutation', markExpenseItemAsReceived: { __typename?: 'MarkExpenseAsReceivedResponse', completed: boolean, expenseStatus: number } };

export type MarkPurchaseItemAsReceivedMutationVariables = Exact<{
  purchaseItemId: Scalars['String']['input'];
  businessId: Scalars['String']['input'];
  quantity: Scalars['Float']['input'];
  transactionDate: Scalars['Date']['input'];
}>;


export type MarkPurchaseItemAsReceivedMutation = { __typename?: 'Mutation', markPurchaseItemAsReceived: { __typename?: 'MarkPurchaseItemAsReceivedResponse', completed: boolean, purchaseStatus: number } };

export type MarkSaleAsDeliveredMutationVariables = Exact<{
  saleId: Scalars['String']['input'];
}>;


export type MarkSaleAsDeliveredMutation = { __typename?: 'Mutation', markSaleAsDelivered: { __typename?: 'MarkSaleAsDeliveredResponse', delivered: boolean, saleStatus: number } };

export type RefreshTokenMutationVariables = Exact<{ [key: string]: never; }>;


export type RefreshTokenMutation = { __typename?: 'Mutation', refreshToken: { __typename?: 'Token', access_token: string, refresh_token: string } };

export type ResendVerificationMutationVariables = Exact<{ [key: string]: never; }>;


export type ResendVerificationMutation = { __typename?: 'Mutation', resendVerification?: boolean | null };

export type SearchCustomerByBusinessQueryVariables = Exact<{
  businessId: Scalars['String']['input'];
  search: Scalars['String']['input'];
}>;


export type SearchCustomerByBusinessQuery = { __typename?: 'Query', searchCustomerByBusiness: Array<{ __typename?: 'Customer', id: string, name: string, mobile: string, email: string, address?: string | null } | null> };

export type SearchProductOrServiceByBusinessQueryVariables = Exact<{
  businessId: Scalars['String']['input'];
  search: Scalars['String']['input'];
}>;


export type SearchProductOrServiceByBusinessQuery = { __typename?: 'Query', searchProductOrServiceByBusiness: Array<{ __typename?: 'ProductOrService', id: string, type: string, title: string, product?: { __typename?: 'Product', id: string, productName: string, price?: number | null, isArchived?: boolean | null, createdAt?: any | null } | null, service?: { __typename?: 'Service', id: string, name: string, price: number, isArchived?: boolean | null, createdAt?: any | null } | null } | null> };

export type SendInvoiceBMutationVariables = Exact<{
  invoiceId: Scalars['String']['input'];
  copy?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type SendInvoiceBMutation = { __typename?: 'Mutation', sendInvoiceB?: boolean | null };

export type SendPurchaseMutationVariables = Exact<{
  purchaseId: Scalars['String']['input'];
  copy?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type SendPurchaseMutation = { __typename?: 'Mutation', sendPurchase?: boolean | null };

export type SignInMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type SignInMutation = { __typename?: 'Mutation', signIn: { __typename?: 'TokenWithVerificationStatus', verified?: boolean | null, token: { __typename?: 'Token', access_token: string, refresh_token: string } } };

export type SignUpMutationVariables = Exact<{
  fullname: Scalars['String']['input'];
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type SignUpMutation = { __typename?: 'Mutation', signUp: { __typename?: 'Token', access_token: string, refresh_token: string } };

export type UpdateAddOnOptionMutationVariables = Exact<{
  addOnOptionId: Scalars['String']['input'];
  addOnName?: InputMaybe<Scalars['String']['input']>;
  addOnPrice?: InputMaybe<Scalars['Float']['input']>;
}>;


export type UpdateAddOnOptionMutation = { __typename?: 'Mutation', updateAddOnOption?: { __typename?: 'AddOnOption', id?: string | null, addOnName?: string | null, addOnPrice?: number | null, updatedAt?: any | null } | null };

export type UpdateBusinessMutationVariables = Exact<{
  businessId: Scalars['String']['input'];
  businessName?: InputMaybe<Scalars['String']['input']>;
  businessEmail?: InputMaybe<Scalars['String']['input']>;
  businessMobile?: InputMaybe<Scalars['String']['input']>;
  businessCategoryId?: InputMaybe<Scalars['String']['input']>;
}>;


export type UpdateBusinessMutation = { __typename?: 'Mutation', updateBusiness?: { __typename?: 'Business', id: string, businessName: string, businessEmail?: string | null, businessMobile?: string | null, businessCategoryId: string } | null };

export type UpdateBusinessCoaMutationVariables = Exact<{
  businessCoaId: Scalars['String']['input'];
  code?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  accountCategoryTypeId?: InputMaybe<Scalars['String']['input']>;
}>;


export type UpdateBusinessCoaMutation = { __typename?: 'Mutation', updateBusinessCOA?: { __typename?: 'BusinessChartOfAccount', id?: string | null, code?: string | null, name?: string | null, createdAt?: any | null, updatedAt?: any | null } | null };

export type UpdateCustomerMutationVariables = Exact<{
  customerId: Scalars['String']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  address?: InputMaybe<Scalars['String']['input']>;
  mobile?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  isArchived?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type UpdateCustomerMutation = { __typename?: 'Mutation', updateCustomer?: { __typename?: 'Customer', id: string, name: string, address?: string | null, mobile: string, email: string, businessId: string, createdAt?: any | null, updatedAt?: any | null } | null };

export type UpdateExpenseMutationVariables = Exact<{
  expenseId: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  expenseCategoryId?: InputMaybe<Scalars['String']['input']>;
  expenseDate?: InputMaybe<Scalars['Date']['input']>;
  merchantId?: InputMaybe<Scalars['String']['input']>;
  expenseItem?: InputMaybe<Array<InputMaybe<ExpenseDetail>> | InputMaybe<ExpenseDetail>>;
}>;


export type UpdateExpenseMutation = { __typename?: 'Mutation', updateExpense?: { __typename?: 'Expense', id: string, description?: string | null, amount: number, expenseDate?: any | null, createdAt: any } | null };

export type UpdateProductMutationVariables = Exact<{
  productId: Scalars['String']['input'];
  productName?: InputMaybe<Scalars['String']['input']>;
  price?: InputMaybe<Scalars['Float']['input']>;
  productUnitId?: InputMaybe<Scalars['String']['input']>;
  trackReorderLevel?: InputMaybe<Scalars['Boolean']['input']>;
  reorderLevel?: InputMaybe<Scalars['Float']['input']>;
}>;


export type UpdateProductMutation = { __typename?: 'Mutation', updateProduct?: { __typename?: 'Product', id: string, productName: string, price?: number | null, productUnitId?: string | null } | null };

export type UpdatePurchaseMutationVariables = Exact<{
  purchaseId: Scalars['String']['input'];
  transactionDate?: InputMaybe<Scalars['Date']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  merchantId?: InputMaybe<Scalars['String']['input']>;
  purchaseItem?: InputMaybe<Array<PurchaseItemDetail> | PurchaseItemDetail>;
}>;


export type UpdatePurchaseMutation = { __typename?: 'Mutation', updatePurchaseEntry?: { __typename?: 'Purchase', id?: string | null, description?: string | null, transactionDate?: any | null, total?: number | null, businessId?: string | null } | null };

export type UpdateSaleMutationVariables = Exact<{
  saleId: Scalars['String']['input'];
  updateInvoiceInput: UpdateCompleteInvoiceB;
  description?: InputMaybe<Scalars['String']['input']>;
  saleExpense?: InputMaybe<Array<SaleExpenseItem> | SaleExpenseItem>;
  saleServiceExpense?: InputMaybe<Array<SaleServiceExpenseEntry> | SaleServiceExpenseEntry>;
}>;


export type UpdateSaleMutation = { __typename?: 'Mutation', updateSaleEntry?: { __typename?: 'Sale', id: string, description?: string | null, saleAmount?: number | null, transactionDate?: any | null, invoice?: { __typename?: 'Invoice', id: string, subtotal: number, totalAmount: number } | null } | null };

export type UpdateServiceMutationVariables = Exact<{
  serviceId: Scalars['String']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  price?: InputMaybe<Scalars['Float']['input']>;
  serviceUnitId?: InputMaybe<Scalars['String']['input']>;
}>;


export type UpdateServiceMutation = { __typename?: 'Mutation', updateService?: { __typename?: 'Service', id: string, name: string, price: number, serviceUnitId?: string | null } | null };

export type UpdateUserMutationVariables = Exact<{
  fullname?: InputMaybe<Scalars['String']['input']>;
  oldPassword?: InputMaybe<Scalars['String']['input']>;
  newPassword?: InputMaybe<Scalars['String']['input']>;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser?: { __typename?: 'User', id: string, fullname: string, email: string } | null };

export type UploadMerchantInvoiceMutationVariables = Exact<{
  businessId: Scalars['String']['input'];
  expenseId: Scalars['String']['input'];
  invoiceDate: Scalars['Date']['input'];
  match: Scalars['Boolean']['input'];
  file?: InputMaybe<Scalars['String']['input']>;
}>;


export type UploadMerchantInvoiceMutation = { __typename?: 'Mutation', uploadMerchantInvoiceToExpense: { __typename?: 'UploadMerchantInvoiceToExpenseResponse', uploaded: boolean, expenseStatus: number } };

export type UploadMerchantInvoiceToPurchaseMutationVariables = Exact<{
  businessId: Scalars['String']['input'];
  purchaseId: Scalars['String']['input'];
  invoiceDate: Scalars['Date']['input'];
  match: Scalars['Boolean']['input'];
  file?: InputMaybe<Scalars['String']['input']>;
}>;


export type UploadMerchantInvoiceToPurchaseMutation = { __typename?: 'Mutation', uploadMerchantInvoiceToPurchase: { __typename?: 'UploadMerchantInvoiceToPurchaseResponse', uploaded: boolean, purchaseStatus: number } };

export type VerificationWithEmailLinkMutationVariables = Exact<{
  userIdFromEmail: Scalars['String']['input'];
}>;


export type VerificationWithEmailLinkMutation = { __typename?: 'Mutation', verificationWithEmailLink?: boolean | null };


export const CreateBusinessServiceUnitDocument = gql`
    mutation CreateBusinessServiceUnit($unitName: String!, $businessId: String!) {
  createBusinessServiceUnit(input: {unitName: $unitName, businessId: $businessId}) {
    unitName
  }
}
    `;
export type CreateBusinessServiceUnitMutationFn = Apollo.MutationFunction<CreateBusinessServiceUnitMutation, CreateBusinessServiceUnitMutationVariables>;

/**
 * __useCreateBusinessServiceUnitMutation__
 *
 * To run a mutation, you first call `useCreateBusinessServiceUnitMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateBusinessServiceUnitMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createBusinessServiceUnitMutation, { data, loading, error }] = useCreateBusinessServiceUnitMutation({
 *   variables: {
 *      unitName: // value for 'unitName'
 *      businessId: // value for 'businessId'
 *   },
 * });
 */
export function useCreateBusinessServiceUnitMutation(baseOptions?: Apollo.MutationHookOptions<CreateBusinessServiceUnitMutation, CreateBusinessServiceUnitMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateBusinessServiceUnitMutation, CreateBusinessServiceUnitMutationVariables>(CreateBusinessServiceUnitDocument, options);
      }
export type CreateBusinessServiceUnitMutationHookResult = ReturnType<typeof useCreateBusinessServiceUnitMutation>;
export type CreateBusinessServiceUnitMutationResult = Apollo.MutationResult<CreateBusinessServiceUnitMutation>;
export type CreateBusinessServiceUnitMutationOptions = Apollo.BaseMutationOptions<CreateBusinessServiceUnitMutation, CreateBusinessServiceUnitMutationVariables>;
export const CreateBusinessProductUnitDocument = gql`
    mutation CreateBusinessProductUnit($unitName: String!, $businessId: String!) {
  createBusinessProductUnit(input: {unitName: $unitName, businessId: $businessId}) {
    unitName
  }
}
    `;
export type CreateBusinessProductUnitMutationFn = Apollo.MutationFunction<CreateBusinessProductUnitMutation, CreateBusinessProductUnitMutationVariables>;

/**
 * __useCreateBusinessProductUnitMutation__
 *
 * To run a mutation, you first call `useCreateBusinessProductUnitMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateBusinessProductUnitMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createBusinessProductUnitMutation, { data, loading, error }] = useCreateBusinessProductUnitMutation({
 *   variables: {
 *      unitName: // value for 'unitName'
 *      businessId: // value for 'businessId'
 *   },
 * });
 */
export function useCreateBusinessProductUnitMutation(baseOptions?: Apollo.MutationHookOptions<CreateBusinessProductUnitMutation, CreateBusinessProductUnitMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateBusinessProductUnitMutation, CreateBusinessProductUnitMutationVariables>(CreateBusinessProductUnitDocument, options);
      }
export type CreateBusinessProductUnitMutationHookResult = ReturnType<typeof useCreateBusinessProductUnitMutation>;
export type CreateBusinessProductUnitMutationResult = Apollo.MutationResult<CreateBusinessProductUnitMutation>;
export type CreateBusinessProductUnitMutationOptions = Apollo.BaseMutationOptions<CreateBusinessProductUnitMutation, CreateBusinessProductUnitMutationVariables>;
export const GetCombinedProductUnitsDocument = gql`
    query GetCombinedProductUnits($businessId: String!) {
  getCombinedProductUnits(businessId: $businessId) {
    id
    unitName
  }
}
    `;

/**
 * __useGetCombinedProductUnitsQuery__
 *
 * To run a query within a React component, call `useGetCombinedProductUnitsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCombinedProductUnitsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCombinedProductUnitsQuery({
 *   variables: {
 *      businessId: // value for 'businessId'
 *   },
 * });
 */
export function useGetCombinedProductUnitsQuery(baseOptions: Apollo.QueryHookOptions<GetCombinedProductUnitsQuery, GetCombinedProductUnitsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCombinedProductUnitsQuery, GetCombinedProductUnitsQueryVariables>(GetCombinedProductUnitsDocument, options);
      }
export function useGetCombinedProductUnitsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCombinedProductUnitsQuery, GetCombinedProductUnitsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCombinedProductUnitsQuery, GetCombinedProductUnitsQueryVariables>(GetCombinedProductUnitsDocument, options);
        }
export function useGetCombinedProductUnitsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetCombinedProductUnitsQuery, GetCombinedProductUnitsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetCombinedProductUnitsQuery, GetCombinedProductUnitsQueryVariables>(GetCombinedProductUnitsDocument, options);
        }
export type GetCombinedProductUnitsQueryHookResult = ReturnType<typeof useGetCombinedProductUnitsQuery>;
export type GetCombinedProductUnitsLazyQueryHookResult = ReturnType<typeof useGetCombinedProductUnitsLazyQuery>;
export type GetCombinedProductUnitsSuspenseQueryHookResult = ReturnType<typeof useGetCombinedProductUnitsSuspenseQuery>;
export type GetCombinedProductUnitsQueryResult = Apollo.QueryResult<GetCombinedProductUnitsQuery, GetCombinedProductUnitsQueryVariables>;
export const GetCombinesServiceUnitsDocument = gql`
    query GetCombinesServiceUnits($businessId: String!) {
  getCombinedServiceUnits(businessId: $businessId) {
    id
    unitName
  }
}
    `;

/**
 * __useGetCombinesServiceUnitsQuery__
 *
 * To run a query within a React component, call `useGetCombinesServiceUnitsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCombinesServiceUnitsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCombinesServiceUnitsQuery({
 *   variables: {
 *      businessId: // value for 'businessId'
 *   },
 * });
 */
export function useGetCombinesServiceUnitsQuery(baseOptions: Apollo.QueryHookOptions<GetCombinesServiceUnitsQuery, GetCombinesServiceUnitsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCombinesServiceUnitsQuery, GetCombinesServiceUnitsQueryVariables>(GetCombinesServiceUnitsDocument, options);
      }
export function useGetCombinesServiceUnitsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCombinesServiceUnitsQuery, GetCombinesServiceUnitsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCombinesServiceUnitsQuery, GetCombinesServiceUnitsQueryVariables>(GetCombinesServiceUnitsDocument, options);
        }
export function useGetCombinesServiceUnitsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetCombinesServiceUnitsQuery, GetCombinesServiceUnitsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetCombinesServiceUnitsQuery, GetCombinesServiceUnitsQueryVariables>(GetCombinesServiceUnitsDocument, options);
        }
export type GetCombinesServiceUnitsQueryHookResult = ReturnType<typeof useGetCombinesServiceUnitsQuery>;
export type GetCombinesServiceUnitsLazyQueryHookResult = ReturnType<typeof useGetCombinesServiceUnitsLazyQuery>;
export type GetCombinesServiceUnitsSuspenseQueryHookResult = ReturnType<typeof useGetCombinesServiceUnitsSuspenseQuery>;
export type GetCombinesServiceUnitsQueryResult = Apollo.QueryResult<GetCombinesServiceUnitsQuery, GetCombinesServiceUnitsQueryVariables>;
export const ArchiveCustomerByBusinessDocument = gql`
    mutation ArchiveCustomerByBusiness($customerId: String!) {
  archiveCustomerByBusiness(customerId: $customerId)
}
    `;
export type ArchiveCustomerByBusinessMutationFn = Apollo.MutationFunction<ArchiveCustomerByBusinessMutation, ArchiveCustomerByBusinessMutationVariables>;

/**
 * __useArchiveCustomerByBusinessMutation__
 *
 * To run a mutation, you first call `useArchiveCustomerByBusinessMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useArchiveCustomerByBusinessMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [archiveCustomerByBusinessMutation, { data, loading, error }] = useArchiveCustomerByBusinessMutation({
 *   variables: {
 *      customerId: // value for 'customerId'
 *   },
 * });
 */
export function useArchiveCustomerByBusinessMutation(baseOptions?: Apollo.MutationHookOptions<ArchiveCustomerByBusinessMutation, ArchiveCustomerByBusinessMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ArchiveCustomerByBusinessMutation, ArchiveCustomerByBusinessMutationVariables>(ArchiveCustomerByBusinessDocument, options);
      }
export type ArchiveCustomerByBusinessMutationHookResult = ReturnType<typeof useArchiveCustomerByBusinessMutation>;
export type ArchiveCustomerByBusinessMutationResult = Apollo.MutationResult<ArchiveCustomerByBusinessMutation>;
export type ArchiveCustomerByBusinessMutationOptions = Apollo.BaseMutationOptions<ArchiveCustomerByBusinessMutation, ArchiveCustomerByBusinessMutationVariables>;
export const ArchiveExpenseDocument = gql`
    mutation ArchiveExpense($expenseId: String!) {
  archiveExpense(expenseId: $expenseId)
}
    `;
export type ArchiveExpenseMutationFn = Apollo.MutationFunction<ArchiveExpenseMutation, ArchiveExpenseMutationVariables>;

/**
 * __useArchiveExpenseMutation__
 *
 * To run a mutation, you first call `useArchiveExpenseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useArchiveExpenseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [archiveExpenseMutation, { data, loading, error }] = useArchiveExpenseMutation({
 *   variables: {
 *      expenseId: // value for 'expenseId'
 *   },
 * });
 */
export function useArchiveExpenseMutation(baseOptions?: Apollo.MutationHookOptions<ArchiveExpenseMutation, ArchiveExpenseMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ArchiveExpenseMutation, ArchiveExpenseMutationVariables>(ArchiveExpenseDocument, options);
      }
export type ArchiveExpenseMutationHookResult = ReturnType<typeof useArchiveExpenseMutation>;
export type ArchiveExpenseMutationResult = Apollo.MutationResult<ArchiveExpenseMutation>;
export type ArchiveExpenseMutationOptions = Apollo.BaseMutationOptions<ArchiveExpenseMutation, ArchiveExpenseMutationVariables>;
export const ArchiveProductByBusinessDocument = gql`
    mutation ArchiveProductByBusiness($productId: String!) {
  archiveProductByBusiness(productId: $productId)
}
    `;
export type ArchiveProductByBusinessMutationFn = Apollo.MutationFunction<ArchiveProductByBusinessMutation, ArchiveProductByBusinessMutationVariables>;

/**
 * __useArchiveProductByBusinessMutation__
 *
 * To run a mutation, you first call `useArchiveProductByBusinessMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useArchiveProductByBusinessMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [archiveProductByBusinessMutation, { data, loading, error }] = useArchiveProductByBusinessMutation({
 *   variables: {
 *      productId: // value for 'productId'
 *   },
 * });
 */
export function useArchiveProductByBusinessMutation(baseOptions?: Apollo.MutationHookOptions<ArchiveProductByBusinessMutation, ArchiveProductByBusinessMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ArchiveProductByBusinessMutation, ArchiveProductByBusinessMutationVariables>(ArchiveProductByBusinessDocument, options);
      }
export type ArchiveProductByBusinessMutationHookResult = ReturnType<typeof useArchiveProductByBusinessMutation>;
export type ArchiveProductByBusinessMutationResult = Apollo.MutationResult<ArchiveProductByBusinessMutation>;
export type ArchiveProductByBusinessMutationOptions = Apollo.BaseMutationOptions<ArchiveProductByBusinessMutation, ArchiveProductByBusinessMutationVariables>;
export const ArchivePurchaseDocument = gql`
    mutation ArchivePurchase($purchaseId: String!) {
  archivePurchase(purchaseId: $purchaseId)
}
    `;
export type ArchivePurchaseMutationFn = Apollo.MutationFunction<ArchivePurchaseMutation, ArchivePurchaseMutationVariables>;

/**
 * __useArchivePurchaseMutation__
 *
 * To run a mutation, you first call `useArchivePurchaseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useArchivePurchaseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [archivePurchaseMutation, { data, loading, error }] = useArchivePurchaseMutation({
 *   variables: {
 *      purchaseId: // value for 'purchaseId'
 *   },
 * });
 */
export function useArchivePurchaseMutation(baseOptions?: Apollo.MutationHookOptions<ArchivePurchaseMutation, ArchivePurchaseMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ArchivePurchaseMutation, ArchivePurchaseMutationVariables>(ArchivePurchaseDocument, options);
      }
export type ArchivePurchaseMutationHookResult = ReturnType<typeof useArchivePurchaseMutation>;
export type ArchivePurchaseMutationResult = Apollo.MutationResult<ArchivePurchaseMutation>;
export type ArchivePurchaseMutationOptions = Apollo.BaseMutationOptions<ArchivePurchaseMutation, ArchivePurchaseMutationVariables>;
export const ArchiveSaleDocument = gql`
    mutation ArchiveSale($saleId: String!) {
  archiveSale(saleId: $saleId)
}
    `;
export type ArchiveSaleMutationFn = Apollo.MutationFunction<ArchiveSaleMutation, ArchiveSaleMutationVariables>;

/**
 * __useArchiveSaleMutation__
 *
 * To run a mutation, you first call `useArchiveSaleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useArchiveSaleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [archiveSaleMutation, { data, loading, error }] = useArchiveSaleMutation({
 *   variables: {
 *      saleId: // value for 'saleId'
 *   },
 * });
 */
export function useArchiveSaleMutation(baseOptions?: Apollo.MutationHookOptions<ArchiveSaleMutation, ArchiveSaleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ArchiveSaleMutation, ArchiveSaleMutationVariables>(ArchiveSaleDocument, options);
      }
export type ArchiveSaleMutationHookResult = ReturnType<typeof useArchiveSaleMutation>;
export type ArchiveSaleMutationResult = Apollo.MutationResult<ArchiveSaleMutation>;
export type ArchiveSaleMutationOptions = Apollo.BaseMutationOptions<ArchiveSaleMutation, ArchiveSaleMutationVariables>;
export const ArchiveServiceByBusinessDocument = gql`
    mutation ArchiveServiceByBusiness($serviceId: String!) {
  archiveServiceByBusiness(serviceId: $serviceId)
}
    `;
export type ArchiveServiceByBusinessMutationFn = Apollo.MutationFunction<ArchiveServiceByBusinessMutation, ArchiveServiceByBusinessMutationVariables>;

/**
 * __useArchiveServiceByBusinessMutation__
 *
 * To run a mutation, you first call `useArchiveServiceByBusinessMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useArchiveServiceByBusinessMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [archiveServiceByBusinessMutation, { data, loading, error }] = useArchiveServiceByBusinessMutation({
 *   variables: {
 *      serviceId: // value for 'serviceId'
 *   },
 * });
 */
export function useArchiveServiceByBusinessMutation(baseOptions?: Apollo.MutationHookOptions<ArchiveServiceByBusinessMutation, ArchiveServiceByBusinessMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ArchiveServiceByBusinessMutation, ArchiveServiceByBusinessMutationVariables>(ArchiveServiceByBusinessDocument, options);
      }
export type ArchiveServiceByBusinessMutationHookResult = ReturnType<typeof useArchiveServiceByBusinessMutation>;
export type ArchiveServiceByBusinessMutationResult = Apollo.MutationResult<ArchiveServiceByBusinessMutation>;
export type ArchiveServiceByBusinessMutationOptions = Apollo.BaseMutationOptions<ArchiveServiceByBusinessMutation, ArchiveServiceByBusinessMutationVariables>;
export const ChangePasswordDocument = gql`
    mutation ChangePassword($forgotPasswordId: String!, $newPassword: String!) {
  changePassword(
    forgotPasswordId: $forgotPasswordId
    input: {newPassword: $newPassword}
  )
}
    `;
export type ChangePasswordMutationFn = Apollo.MutationFunction<ChangePasswordMutation, ChangePasswordMutationVariables>;

/**
 * __useChangePasswordMutation__
 *
 * To run a mutation, you first call `useChangePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changePasswordMutation, { data, loading, error }] = useChangePasswordMutation({
 *   variables: {
 *      forgotPasswordId: // value for 'forgotPasswordId'
 *      newPassword: // value for 'newPassword'
 *   },
 * });
 */
export function useChangePasswordMutation(baseOptions?: Apollo.MutationHookOptions<ChangePasswordMutation, ChangePasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument, options);
      }
export type ChangePasswordMutationHookResult = ReturnType<typeof useChangePasswordMutation>;
export type ChangePasswordMutationResult = Apollo.MutationResult<ChangePasswordMutation>;
export type ChangePasswordMutationOptions = Apollo.BaseMutationOptions<ChangePasswordMutation, ChangePasswordMutationVariables>;
export const CheckIfNewBusinessDocument = gql`
    query CheckIfNewBusiness($businessId: String!) {
  checkIfNewBusiness(businessId: $businessId)
}
    `;

/**
 * __useCheckIfNewBusinessQuery__
 *
 * To run a query within a React component, call `useCheckIfNewBusinessQuery` and pass it any options that fit your needs.
 * When your component renders, `useCheckIfNewBusinessQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCheckIfNewBusinessQuery({
 *   variables: {
 *      businessId: // value for 'businessId'
 *   },
 * });
 */
export function useCheckIfNewBusinessQuery(baseOptions: Apollo.QueryHookOptions<CheckIfNewBusinessQuery, CheckIfNewBusinessQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CheckIfNewBusinessQuery, CheckIfNewBusinessQueryVariables>(CheckIfNewBusinessDocument, options);
      }
export function useCheckIfNewBusinessLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CheckIfNewBusinessQuery, CheckIfNewBusinessQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CheckIfNewBusinessQuery, CheckIfNewBusinessQueryVariables>(CheckIfNewBusinessDocument, options);
        }
export function useCheckIfNewBusinessSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<CheckIfNewBusinessQuery, CheckIfNewBusinessQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<CheckIfNewBusinessQuery, CheckIfNewBusinessQueryVariables>(CheckIfNewBusinessDocument, options);
        }
export type CheckIfNewBusinessQueryHookResult = ReturnType<typeof useCheckIfNewBusinessQuery>;
export type CheckIfNewBusinessLazyQueryHookResult = ReturnType<typeof useCheckIfNewBusinessLazyQuery>;
export type CheckIfNewBusinessSuspenseQueryHookResult = ReturnType<typeof useCheckIfNewBusinessSuspenseQuery>;
export type CheckIfNewBusinessQueryResult = Apollo.QueryResult<CheckIfNewBusinessQuery, CheckIfNewBusinessQueryVariables>;
export const VerificationDocument = gql`
    mutation Verification($code: Float!) {
  verification(code: $code)
}
    `;
export type VerificationMutationFn = Apollo.MutationFunction<VerificationMutation, VerificationMutationVariables>;

/**
 * __useVerificationMutation__
 *
 * To run a mutation, you first call `useVerificationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVerificationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [verificationMutation, { data, loading, error }] = useVerificationMutation({
 *   variables: {
 *      code: // value for 'code'
 *   },
 * });
 */
export function useVerificationMutation(baseOptions?: Apollo.MutationHookOptions<VerificationMutation, VerificationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<VerificationMutation, VerificationMutationVariables>(VerificationDocument, options);
      }
export type VerificationMutationHookResult = ReturnType<typeof useVerificationMutation>;
export type VerificationMutationResult = Apollo.MutationResult<VerificationMutation>;
export type VerificationMutationOptions = Apollo.BaseMutationOptions<VerificationMutation, VerificationMutationVariables>;
export const CreateAddOnOptionDocument = gql`
    mutation CreateAddOnOption($addOnName: String!, $addOnPrice: Float!) {
  createAddOnOption(input: {addOnName: $addOnName, addOnPrice: $addOnPrice}) {
    id
    addOnName
    addOnPrice
    createdAt
  }
}
    `;
export type CreateAddOnOptionMutationFn = Apollo.MutationFunction<CreateAddOnOptionMutation, CreateAddOnOptionMutationVariables>;

/**
 * __useCreateAddOnOptionMutation__
 *
 * To run a mutation, you first call `useCreateAddOnOptionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateAddOnOptionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createAddOnOptionMutation, { data, loading, error }] = useCreateAddOnOptionMutation({
 *   variables: {
 *      addOnName: // value for 'addOnName'
 *      addOnPrice: // value for 'addOnPrice'
 *   },
 * });
 */
export function useCreateAddOnOptionMutation(baseOptions?: Apollo.MutationHookOptions<CreateAddOnOptionMutation, CreateAddOnOptionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateAddOnOptionMutation, CreateAddOnOptionMutationVariables>(CreateAddOnOptionDocument, options);
      }
export type CreateAddOnOptionMutationHookResult = ReturnType<typeof useCreateAddOnOptionMutation>;
export type CreateAddOnOptionMutationResult = Apollo.MutationResult<CreateAddOnOptionMutation>;
export type CreateAddOnOptionMutationOptions = Apollo.BaseMutationOptions<CreateAddOnOptionMutation, CreateAddOnOptionMutationVariables>;
export const CreateBusinessDocument = gql`
    mutation CreateBusiness($businessName: String!, $businessEmail: String!, $businessMobile: String!, $businessCategoryId: String!) {
  createBusiness(
    input: {businessName: $businessName, businessEmail: $businessEmail, businessMobile: $businessMobile, businessCategoryId: $businessCategoryId}
  ) {
    id
    businessName
    businessEmail
    businessMobile
  }
}
    `;
export type CreateBusinessMutationFn = Apollo.MutationFunction<CreateBusinessMutation, CreateBusinessMutationVariables>;

/**
 * __useCreateBusinessMutation__
 *
 * To run a mutation, you first call `useCreateBusinessMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateBusinessMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createBusinessMutation, { data, loading, error }] = useCreateBusinessMutation({
 *   variables: {
 *      businessName: // value for 'businessName'
 *      businessEmail: // value for 'businessEmail'
 *      businessMobile: // value for 'businessMobile'
 *      businessCategoryId: // value for 'businessCategoryId'
 *   },
 * });
 */
export function useCreateBusinessMutation(baseOptions?: Apollo.MutationHookOptions<CreateBusinessMutation, CreateBusinessMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateBusinessMutation, CreateBusinessMutationVariables>(CreateBusinessDocument, options);
      }
export type CreateBusinessMutationHookResult = ReturnType<typeof useCreateBusinessMutation>;
export type CreateBusinessMutationResult = Apollo.MutationResult<CreateBusinessMutation>;
export type CreateBusinessMutationOptions = Apollo.BaseMutationOptions<CreateBusinessMutation, CreateBusinessMutationVariables>;
export const CreateNewBusinessCoaDocument = gql`
    mutation CreateNewBusinessCOA($code: String!, $name: String!, $description: String, $accountCategoryTypeId: String!, $businessId: String!) {
  createBusinessCOA(
    input: {code: $code, name: $name, description: $description, accountCategoryTypeId: $accountCategoryTypeId, businessId: $businessId}
  ) {
    id
    code
    name
    createdAt
  }
}
    `;
export type CreateNewBusinessCoaMutationFn = Apollo.MutationFunction<CreateNewBusinessCoaMutation, CreateNewBusinessCoaMutationVariables>;

/**
 * __useCreateNewBusinessCoaMutation__
 *
 * To run a mutation, you first call `useCreateNewBusinessCoaMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateNewBusinessCoaMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createNewBusinessCoaMutation, { data, loading, error }] = useCreateNewBusinessCoaMutation({
 *   variables: {
 *      code: // value for 'code'
 *      name: // value for 'name'
 *      description: // value for 'description'
 *      accountCategoryTypeId: // value for 'accountCategoryTypeId'
 *      businessId: // value for 'businessId'
 *   },
 * });
 */
export function useCreateNewBusinessCoaMutation(baseOptions?: Apollo.MutationHookOptions<CreateNewBusinessCoaMutation, CreateNewBusinessCoaMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateNewBusinessCoaMutation, CreateNewBusinessCoaMutationVariables>(CreateNewBusinessCoaDocument, options);
      }
export type CreateNewBusinessCoaMutationHookResult = ReturnType<typeof useCreateNewBusinessCoaMutation>;
export type CreateNewBusinessCoaMutationResult = Apollo.MutationResult<CreateNewBusinessCoaMutation>;
export type CreateNewBusinessCoaMutationOptions = Apollo.BaseMutationOptions<CreateNewBusinessCoaMutation, CreateNewBusinessCoaMutationVariables>;
export const CreateCustomerDocument = gql`
    mutation CreateCustomer($name: String!, $address: String, $mobile: String!, $email: String!, $businessId: String!) {
  createCustomer(
    input: {name: $name, address: $address, mobile: $mobile, email: $email, businessId: $businessId}
  ) {
    id
    name
    address
    mobile
    email
    business {
      businessName
      businessEmail
      businessMobile
    }
    createdAt
  }
}
    `;
export type CreateCustomerMutationFn = Apollo.MutationFunction<CreateCustomerMutation, CreateCustomerMutationVariables>;

/**
 * __useCreateCustomerMutation__
 *
 * To run a mutation, you first call `useCreateCustomerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCustomerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCustomerMutation, { data, loading, error }] = useCreateCustomerMutation({
 *   variables: {
 *      name: // value for 'name'
 *      address: // value for 'address'
 *      mobile: // value for 'mobile'
 *      email: // value for 'email'
 *      businessId: // value for 'businessId'
 *   },
 * });
 */
export function useCreateCustomerMutation(baseOptions?: Apollo.MutationHookOptions<CreateCustomerMutation, CreateCustomerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCustomerMutation, CreateCustomerMutationVariables>(CreateCustomerDocument, options);
      }
export type CreateCustomerMutationHookResult = ReturnType<typeof useCreateCustomerMutation>;
export type CreateCustomerMutationResult = Apollo.MutationResult<CreateCustomerMutation>;
export type CreateCustomerMutationOptions = Apollo.BaseMutationOptions<CreateCustomerMutation, CreateCustomerMutationVariables>;
export const CreateCustomerWithCsvDocument = gql`
    mutation CreateCustomerWithCSV($businessId: String!, $csvFile: Any!) {
  createCustomerWithCsv(businessId: $businessId, csvFile: $csvFile)
}
    `;
export type CreateCustomerWithCsvMutationFn = Apollo.MutationFunction<CreateCustomerWithCsvMutation, CreateCustomerWithCsvMutationVariables>;

/**
 * __useCreateCustomerWithCsvMutation__
 *
 * To run a mutation, you first call `useCreateCustomerWithCsvMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCustomerWithCsvMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCustomerWithCsvMutation, { data, loading, error }] = useCreateCustomerWithCsvMutation({
 *   variables: {
 *      businessId: // value for 'businessId'
 *      csvFile: // value for 'csvFile'
 *   },
 * });
 */
export function useCreateCustomerWithCsvMutation(baseOptions?: Apollo.MutationHookOptions<CreateCustomerWithCsvMutation, CreateCustomerWithCsvMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCustomerWithCsvMutation, CreateCustomerWithCsvMutationVariables>(CreateCustomerWithCsvDocument, options);
      }
export type CreateCustomerWithCsvMutationHookResult = ReturnType<typeof useCreateCustomerWithCsvMutation>;
export type CreateCustomerWithCsvMutationResult = Apollo.MutationResult<CreateCustomerWithCsvMutation>;
export type CreateCustomerWithCsvMutationOptions = Apollo.BaseMutationOptions<CreateCustomerWithCsvMutation, CreateCustomerWithCsvMutationVariables>;
export const CreateExpenseDocument = gql`
    mutation CreateExpense($description: String!, $expenseCategoryId: String, $businessId: String!, $expenseDate: Date!, $merchantId: String!, $recurring: Boolean, $expenseItem: [ExpenseDetail!]!) {
  createExpense(
    input: {description: $description, expenseCategoryId: $expenseCategoryId, businessId: $businessId, expenseDate: $expenseDate, merchantId: $merchantId, recurring: $recurring, expenseItem: $expenseItem}
  ) {
    id
    description
    reference
    amount
    expenseDate
    createdAt
  }
}
    `;
export type CreateExpenseMutationFn = Apollo.MutationFunction<CreateExpenseMutation, CreateExpenseMutationVariables>;

/**
 * __useCreateExpenseMutation__
 *
 * To run a mutation, you first call `useCreateExpenseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateExpenseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createExpenseMutation, { data, loading, error }] = useCreateExpenseMutation({
 *   variables: {
 *      description: // value for 'description'
 *      expenseCategoryId: // value for 'expenseCategoryId'
 *      businessId: // value for 'businessId'
 *      expenseDate: // value for 'expenseDate'
 *      merchantId: // value for 'merchantId'
 *      recurring: // value for 'recurring'
 *      expenseItem: // value for 'expenseItem'
 *   },
 * });
 */
export function useCreateExpenseMutation(baseOptions?: Apollo.MutationHookOptions<CreateExpenseMutation, CreateExpenseMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateExpenseMutation, CreateExpenseMutationVariables>(CreateExpenseDocument, options);
      }
export type CreateExpenseMutationHookResult = ReturnType<typeof useCreateExpenseMutation>;
export type CreateExpenseMutationResult = Apollo.MutationResult<CreateExpenseMutation>;
export type CreateExpenseMutationOptions = Apollo.BaseMutationOptions<CreateExpenseMutation, CreateExpenseMutationVariables>;
export const CreateCompleteExpenseWithCsvDocument = gql`
    mutation CreateCompleteExpenseWithCsv($businessId: String!, $csvFile: Any!) {
  createCompletedExpenseWithCsv(businessId: $businessId, csvFile: $csvFile)
}
    `;
export type CreateCompleteExpenseWithCsvMutationFn = Apollo.MutationFunction<CreateCompleteExpenseWithCsvMutation, CreateCompleteExpenseWithCsvMutationVariables>;

/**
 * __useCreateCompleteExpenseWithCsvMutation__
 *
 * To run a mutation, you first call `useCreateCompleteExpenseWithCsvMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCompleteExpenseWithCsvMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCompleteExpenseWithCsvMutation, { data, loading, error }] = useCreateCompleteExpenseWithCsvMutation({
 *   variables: {
 *      businessId: // value for 'businessId'
 *      csvFile: // value for 'csvFile'
 *   },
 * });
 */
export function useCreateCompleteExpenseWithCsvMutation(baseOptions?: Apollo.MutationHookOptions<CreateCompleteExpenseWithCsvMutation, CreateCompleteExpenseWithCsvMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCompleteExpenseWithCsvMutation, CreateCompleteExpenseWithCsvMutationVariables>(CreateCompleteExpenseWithCsvDocument, options);
      }
export type CreateCompleteExpenseWithCsvMutationHookResult = ReturnType<typeof useCreateCompleteExpenseWithCsvMutation>;
export type CreateCompleteExpenseWithCsvMutationResult = Apollo.MutationResult<CreateCompleteExpenseWithCsvMutation>;
export type CreateCompleteExpenseWithCsvMutationOptions = Apollo.BaseMutationOptions<CreateCompleteExpenseWithCsvMutation, CreateCompleteExpenseWithCsvMutationVariables>;
export const CreateMerchantDocument = gql`
    mutation CreateMerchant($name: String!, $businessId: String!, $email: String!) {
  createMerchant(input: {name: $name, businessId: $businessId, email: $email}) {
    id
    name
    email
  }
}
    `;
export type CreateMerchantMutationFn = Apollo.MutationFunction<CreateMerchantMutation, CreateMerchantMutationVariables>;

/**
 * __useCreateMerchantMutation__
 *
 * To run a mutation, you first call `useCreateMerchantMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateMerchantMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createMerchantMutation, { data, loading, error }] = useCreateMerchantMutation({
 *   variables: {
 *      name: // value for 'name'
 *      businessId: // value for 'businessId'
 *      email: // value for 'email'
 *   },
 * });
 */
export function useCreateMerchantMutation(baseOptions?: Apollo.MutationHookOptions<CreateMerchantMutation, CreateMerchantMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateMerchantMutation, CreateMerchantMutationVariables>(CreateMerchantDocument, options);
      }
export type CreateMerchantMutationHookResult = ReturnType<typeof useCreateMerchantMutation>;
export type CreateMerchantMutationResult = Apollo.MutationResult<CreateMerchantMutation>;
export type CreateMerchantMutationOptions = Apollo.BaseMutationOptions<CreateMerchantMutation, CreateMerchantMutationVariables>;
export const CreateProductDocument = gql`
    mutation CreateProduct($productName: String!, $businessId: String!, $price: Float!, $productUnitId: String!, $initialStockLevel: Float) {
  createProduct(
    input: {businessId: $businessId, productName: $productName, price: $price, productUnitId: $productUnitId, initialStockLevel: $initialStockLevel}
  ) {
    id
    productName
    price
    productUnitId
    businessProductUnitId
    isArchived
    createdAt
  }
}
    `;
export type CreateProductMutationFn = Apollo.MutationFunction<CreateProductMutation, CreateProductMutationVariables>;

/**
 * __useCreateProductMutation__
 *
 * To run a mutation, you first call `useCreateProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProductMutation, { data, loading, error }] = useCreateProductMutation({
 *   variables: {
 *      productName: // value for 'productName'
 *      businessId: // value for 'businessId'
 *      price: // value for 'price'
 *      productUnitId: // value for 'productUnitId'
 *      initialStockLevel: // value for 'initialStockLevel'
 *   },
 * });
 */
export function useCreateProductMutation(baseOptions?: Apollo.MutationHookOptions<CreateProductMutation, CreateProductMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateProductMutation, CreateProductMutationVariables>(CreateProductDocument, options);
      }
export type CreateProductMutationHookResult = ReturnType<typeof useCreateProductMutation>;
export type CreateProductMutationResult = Apollo.MutationResult<CreateProductMutation>;
export type CreateProductMutationOptions = Apollo.BaseMutationOptions<CreateProductMutation, CreateProductMutationVariables>;
export const CreateProductWithCsvDocument = gql`
    mutation CreateProductWithCSV($businessId: String!, $csvFile: Any!) {
  createProductsWithCsv(businessId: $businessId, csvFile: $csvFile)
}
    `;
export type CreateProductWithCsvMutationFn = Apollo.MutationFunction<CreateProductWithCsvMutation, CreateProductWithCsvMutationVariables>;

/**
 * __useCreateProductWithCsvMutation__
 *
 * To run a mutation, you first call `useCreateProductWithCsvMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProductWithCsvMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProductWithCsvMutation, { data, loading, error }] = useCreateProductWithCsvMutation({
 *   variables: {
 *      businessId: // value for 'businessId'
 *      csvFile: // value for 'csvFile'
 *   },
 * });
 */
export function useCreateProductWithCsvMutation(baseOptions?: Apollo.MutationHookOptions<CreateProductWithCsvMutation, CreateProductWithCsvMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateProductWithCsvMutation, CreateProductWithCsvMutationVariables>(CreateProductWithCsvDocument, options);
      }
export type CreateProductWithCsvMutationHookResult = ReturnType<typeof useCreateProductWithCsvMutation>;
export type CreateProductWithCsvMutationResult = Apollo.MutationResult<CreateProductWithCsvMutation>;
export type CreateProductWithCsvMutationOptions = Apollo.BaseMutationOptions<CreateProductWithCsvMutation, CreateProductWithCsvMutationVariables>;
export const CreatePurchaseEntryDocument = gql`
    mutation CreatePurchaseEntry($transactionDate: Date!, $description: String!, $merchantId: String!, $businessId: String!, $purchaseItem: [PurchaseItemDetail!]!) {
  createPurchaseEntry(
    input: {transactionDate: $transactionDate, description: $description, merchantId: $merchantId, businessId: $businessId, purchaseItem: $purchaseItem}
  ) {
    id
    description
    reference
    transactionDate
    businessId
    createdAt
  }
}
    `;
export type CreatePurchaseEntryMutationFn = Apollo.MutationFunction<CreatePurchaseEntryMutation, CreatePurchaseEntryMutationVariables>;

/**
 * __useCreatePurchaseEntryMutation__
 *
 * To run a mutation, you first call `useCreatePurchaseEntryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePurchaseEntryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPurchaseEntryMutation, { data, loading, error }] = useCreatePurchaseEntryMutation({
 *   variables: {
 *      transactionDate: // value for 'transactionDate'
 *      description: // value for 'description'
 *      merchantId: // value for 'merchantId'
 *      businessId: // value for 'businessId'
 *      purchaseItem: // value for 'purchaseItem'
 *   },
 * });
 */
export function useCreatePurchaseEntryMutation(baseOptions?: Apollo.MutationHookOptions<CreatePurchaseEntryMutation, CreatePurchaseEntryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePurchaseEntryMutation, CreatePurchaseEntryMutationVariables>(CreatePurchaseEntryDocument, options);
      }
export type CreatePurchaseEntryMutationHookResult = ReturnType<typeof useCreatePurchaseEntryMutation>;
export type CreatePurchaseEntryMutationResult = Apollo.MutationResult<CreatePurchaseEntryMutation>;
export type CreatePurchaseEntryMutationOptions = Apollo.BaseMutationOptions<CreatePurchaseEntryMutation, CreatePurchaseEntryMutationVariables>;
export const CreateCompletedPurchaseWithCsvDocument = gql`
    mutation CreateCompletedPurchaseWithCsv($businessId: String!, $csvFile: Any!) {
  createCompletedPurchaseWithCsv(businessId: $businessId, csvFile: $csvFile)
}
    `;
export type CreateCompletedPurchaseWithCsvMutationFn = Apollo.MutationFunction<CreateCompletedPurchaseWithCsvMutation, CreateCompletedPurchaseWithCsvMutationVariables>;

/**
 * __useCreateCompletedPurchaseWithCsvMutation__
 *
 * To run a mutation, you first call `useCreateCompletedPurchaseWithCsvMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCompletedPurchaseWithCsvMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCompletedPurchaseWithCsvMutation, { data, loading, error }] = useCreateCompletedPurchaseWithCsvMutation({
 *   variables: {
 *      businessId: // value for 'businessId'
 *      csvFile: // value for 'csvFile'
 *   },
 * });
 */
export function useCreateCompletedPurchaseWithCsvMutation(baseOptions?: Apollo.MutationHookOptions<CreateCompletedPurchaseWithCsvMutation, CreateCompletedPurchaseWithCsvMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCompletedPurchaseWithCsvMutation, CreateCompletedPurchaseWithCsvMutationVariables>(CreateCompletedPurchaseWithCsvDocument, options);
      }
export type CreateCompletedPurchaseWithCsvMutationHookResult = ReturnType<typeof useCreateCompletedPurchaseWithCsvMutation>;
export type CreateCompletedPurchaseWithCsvMutationResult = Apollo.MutationResult<CreateCompletedPurchaseWithCsvMutation>;
export type CreateCompletedPurchaseWithCsvMutationOptions = Apollo.BaseMutationOptions<CreateCompletedPurchaseWithCsvMutation, CreateCompletedPurchaseWithCsvMutationVariables>;
export const CreateSaleEntryDocument = gql`
    mutation CreateSaleEntry($description: String!, $invoiceInput: CreateCompleteInvoiceB!, $saleExpense: [SaleExpenseItem!], $saleServiceExpense: [SaleServiceExpenseEntry!]) {
  createSaleEntry(
    input: {invoiceInput: $invoiceInput, description: $description, saleExpense: $saleExpense, saleServiceExpense: $saleServiceExpense}
  ) {
    id
    description
    saleAmount
    transactionDate
    saleStatusId
    invoice {
      id
      reference
      subtotal
      totalAmount
    }
  }
}
    `;
export type CreateSaleEntryMutationFn = Apollo.MutationFunction<CreateSaleEntryMutation, CreateSaleEntryMutationVariables>;

/**
 * __useCreateSaleEntryMutation__
 *
 * To run a mutation, you first call `useCreateSaleEntryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateSaleEntryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createSaleEntryMutation, { data, loading, error }] = useCreateSaleEntryMutation({
 *   variables: {
 *      description: // value for 'description'
 *      invoiceInput: // value for 'invoiceInput'
 *      saleExpense: // value for 'saleExpense'
 *      saleServiceExpense: // value for 'saleServiceExpense'
 *   },
 * });
 */
export function useCreateSaleEntryMutation(baseOptions?: Apollo.MutationHookOptions<CreateSaleEntryMutation, CreateSaleEntryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateSaleEntryMutation, CreateSaleEntryMutationVariables>(CreateSaleEntryDocument, options);
      }
export type CreateSaleEntryMutationHookResult = ReturnType<typeof useCreateSaleEntryMutation>;
export type CreateSaleEntryMutationResult = Apollo.MutationResult<CreateSaleEntryMutation>;
export type CreateSaleEntryMutationOptions = Apollo.BaseMutationOptions<CreateSaleEntryMutation, CreateSaleEntryMutationVariables>;
export const CreateServiceDocument = gql`
    mutation CreateService($name: String!, $price: Float!, $businessId: String!, $serviceUnitId: String!) {
  createService(
    input: {name: $name, price: $price, businessId: $businessId, serviceUnitId: $serviceUnitId}
  ) {
    id
    name
    price
    businessId
    serviceUnitId
    isArchived
    createdAt
  }
}
    `;
export type CreateServiceMutationFn = Apollo.MutationFunction<CreateServiceMutation, CreateServiceMutationVariables>;

/**
 * __useCreateServiceMutation__
 *
 * To run a mutation, you first call `useCreateServiceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateServiceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createServiceMutation, { data, loading, error }] = useCreateServiceMutation({
 *   variables: {
 *      name: // value for 'name'
 *      price: // value for 'price'
 *      businessId: // value for 'businessId'
 *      serviceUnitId: // value for 'serviceUnitId'
 *   },
 * });
 */
export function useCreateServiceMutation(baseOptions?: Apollo.MutationHookOptions<CreateServiceMutation, CreateServiceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateServiceMutation, CreateServiceMutationVariables>(CreateServiceDocument, options);
      }
export type CreateServiceMutationHookResult = ReturnType<typeof useCreateServiceMutation>;
export type CreateServiceMutationResult = Apollo.MutationResult<CreateServiceMutation>;
export type CreateServiceMutationOptions = Apollo.BaseMutationOptions<CreateServiceMutation, CreateServiceMutationVariables>;
export const CreateServiceWithCsvDocument = gql`
    mutation CreateServiceWithCsv($businessId: String!, $csvFile: Any!) {
  createServicesWithCsv(businessId: $businessId, csvFile: $csvFile)
}
    `;
export type CreateServiceWithCsvMutationFn = Apollo.MutationFunction<CreateServiceWithCsvMutation, CreateServiceWithCsvMutationVariables>;

/**
 * __useCreateServiceWithCsvMutation__
 *
 * To run a mutation, you first call `useCreateServiceWithCsvMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateServiceWithCsvMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createServiceWithCsvMutation, { data, loading, error }] = useCreateServiceWithCsvMutation({
 *   variables: {
 *      businessId: // value for 'businessId'
 *      csvFile: // value for 'csvFile'
 *   },
 * });
 */
export function useCreateServiceWithCsvMutation(baseOptions?: Apollo.MutationHookOptions<CreateServiceWithCsvMutation, CreateServiceWithCsvMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateServiceWithCsvMutation, CreateServiceWithCsvMutationVariables>(CreateServiceWithCsvDocument, options);
      }
export type CreateServiceWithCsvMutationHookResult = ReturnType<typeof useCreateServiceWithCsvMutation>;
export type CreateServiceWithCsvMutationResult = Apollo.MutationResult<CreateServiceWithCsvMutation>;
export type CreateServiceWithCsvMutationOptions = Apollo.BaseMutationOptions<CreateServiceWithCsvMutation, CreateServiceWithCsvMutationVariables>;
export const CreateSubscriptionDocument = gql`
    mutation CreateSubscription($businessId: String!, $currentPlanId: String!, $offerId: String, $addOnOptionId: String, $addOnQuantity: Float, $tax: Float!, $cardNumber: String!, $cardCVV: String!, $cardType: String, $cardExpiry: String!, $cardPin: String!, $billingAddress: String) {
  createSubscription(
    input: {businessId: $businessId, currentPlanId: $currentPlanId, cardNumber: $cardNumber, cardCVV: $cardCVV, cardType: $cardType, cardExpiry: $cardExpiry, cardPin: $cardPin, billingAddress: $billingAddress, offerId: $offerId, addOnOptionId: $addOnOptionId, addOnQuantity: $addOnQuantity, tax: $tax}
  ) {
    id
    dateSubscribed
    validTo
    business {
      businessName
    }
    subscriptionInvoice {
      invoiceDescription
      invoiceTotal
      invoicePaid
    }
  }
}
    `;
export type CreateSubscriptionMutationFn = Apollo.MutationFunction<CreateSubscriptionMutation, CreateSubscriptionMutationVariables>;

/**
 * __useCreateSubscriptionMutation__
 *
 * To run a mutation, you first call `useCreateSubscriptionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateSubscriptionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createSubscriptionMutation, { data, loading, error }] = useCreateSubscriptionMutation({
 *   variables: {
 *      businessId: // value for 'businessId'
 *      currentPlanId: // value for 'currentPlanId'
 *      offerId: // value for 'offerId'
 *      addOnOptionId: // value for 'addOnOptionId'
 *      addOnQuantity: // value for 'addOnQuantity'
 *      tax: // value for 'tax'
 *      cardNumber: // value for 'cardNumber'
 *      cardCVV: // value for 'cardCVV'
 *      cardType: // value for 'cardType'
 *      cardExpiry: // value for 'cardExpiry'
 *      cardPin: // value for 'cardPin'
 *      billingAddress: // value for 'billingAddress'
 *   },
 * });
 */
export function useCreateSubscriptionMutation(baseOptions?: Apollo.MutationHookOptions<CreateSubscriptionMutation, CreateSubscriptionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateSubscriptionMutation, CreateSubscriptionMutationVariables>(CreateSubscriptionDocument, options);
      }
export type CreateSubscriptionMutationHookResult = ReturnType<typeof useCreateSubscriptionMutation>;
export type CreateSubscriptionMutationResult = Apollo.MutationResult<CreateSubscriptionMutation>;
export type CreateSubscriptionMutationOptions = Apollo.BaseMutationOptions<CreateSubscriptionMutation, CreateSubscriptionMutationVariables>;
export const DeleteProductDocument = gql`
    mutation DeleteProduct($productId: String!) {
  deleteProduct(productId: $productId)
}
    `;
export type DeleteProductMutationFn = Apollo.MutationFunction<DeleteProductMutation, DeleteProductMutationVariables>;

/**
 * __useDeleteProductMutation__
 *
 * To run a mutation, you first call `useDeleteProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteProductMutation, { data, loading, error }] = useDeleteProductMutation({
 *   variables: {
 *      productId: // value for 'productId'
 *   },
 * });
 */
export function useDeleteProductMutation(baseOptions?: Apollo.MutationHookOptions<DeleteProductMutation, DeleteProductMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteProductMutation, DeleteProductMutationVariables>(DeleteProductDocument, options);
      }
export type DeleteProductMutationHookResult = ReturnType<typeof useDeleteProductMutation>;
export type DeleteProductMutationResult = Apollo.MutationResult<DeleteProductMutation>;
export type DeleteProductMutationOptions = Apollo.BaseMutationOptions<DeleteProductMutation, DeleteProductMutationVariables>;
export const DeleteAddOnOptionDocument = gql`
    mutation DeleteAddOnOption($addOnOptionId: String!) {
  deleteAddOnOption(addOnOptionId: $addOnOptionId)
}
    `;
export type DeleteAddOnOptionMutationFn = Apollo.MutationFunction<DeleteAddOnOptionMutation, DeleteAddOnOptionMutationVariables>;

/**
 * __useDeleteAddOnOptionMutation__
 *
 * To run a mutation, you first call `useDeleteAddOnOptionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteAddOnOptionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteAddOnOptionMutation, { data, loading, error }] = useDeleteAddOnOptionMutation({
 *   variables: {
 *      addOnOptionId: // value for 'addOnOptionId'
 *   },
 * });
 */
export function useDeleteAddOnOptionMutation(baseOptions?: Apollo.MutationHookOptions<DeleteAddOnOptionMutation, DeleteAddOnOptionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteAddOnOptionMutation, DeleteAddOnOptionMutationVariables>(DeleteAddOnOptionDocument, options);
      }
export type DeleteAddOnOptionMutationHookResult = ReturnType<typeof useDeleteAddOnOptionMutation>;
export type DeleteAddOnOptionMutationResult = Apollo.MutationResult<DeleteAddOnOptionMutation>;
export type DeleteAddOnOptionMutationOptions = Apollo.BaseMutationOptions<DeleteAddOnOptionMutation, DeleteAddOnOptionMutationVariables>;
export const DeleteCustomerDocument = gql`
    mutation DeleteCustomer($customerId: String!) {
  deleteCustomer(customerId: $customerId)
}
    `;
export type DeleteCustomerMutationFn = Apollo.MutationFunction<DeleteCustomerMutation, DeleteCustomerMutationVariables>;

/**
 * __useDeleteCustomerMutation__
 *
 * To run a mutation, you first call `useDeleteCustomerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCustomerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCustomerMutation, { data, loading, error }] = useDeleteCustomerMutation({
 *   variables: {
 *      customerId: // value for 'customerId'
 *   },
 * });
 */
export function useDeleteCustomerMutation(baseOptions?: Apollo.MutationHookOptions<DeleteCustomerMutation, DeleteCustomerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteCustomerMutation, DeleteCustomerMutationVariables>(DeleteCustomerDocument, options);
      }
export type DeleteCustomerMutationHookResult = ReturnType<typeof useDeleteCustomerMutation>;
export type DeleteCustomerMutationResult = Apollo.MutationResult<DeleteCustomerMutation>;
export type DeleteCustomerMutationOptions = Apollo.BaseMutationOptions<DeleteCustomerMutation, DeleteCustomerMutationVariables>;
export const DeleteExpenseDocument = gql`
    mutation DeleteExpense($expenseId: String!) {
  deleteExpense(expenseId: $expenseId)
}
    `;
export type DeleteExpenseMutationFn = Apollo.MutationFunction<DeleteExpenseMutation, DeleteExpenseMutationVariables>;

/**
 * __useDeleteExpenseMutation__
 *
 * To run a mutation, you first call `useDeleteExpenseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteExpenseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteExpenseMutation, { data, loading, error }] = useDeleteExpenseMutation({
 *   variables: {
 *      expenseId: // value for 'expenseId'
 *   },
 * });
 */
export function useDeleteExpenseMutation(baseOptions?: Apollo.MutationHookOptions<DeleteExpenseMutation, DeleteExpenseMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteExpenseMutation, DeleteExpenseMutationVariables>(DeleteExpenseDocument, options);
      }
export type DeleteExpenseMutationHookResult = ReturnType<typeof useDeleteExpenseMutation>;
export type DeleteExpenseMutationResult = Apollo.MutationResult<DeleteExpenseMutation>;
export type DeleteExpenseMutationOptions = Apollo.BaseMutationOptions<DeleteExpenseMutation, DeleteExpenseMutationVariables>;
export const DeletePurchaseDocument = gql`
    mutation DeletePurchase($purchaseId: String!) {
  deletePurchase(purchaseId: $purchaseId)
}
    `;
export type DeletePurchaseMutationFn = Apollo.MutationFunction<DeletePurchaseMutation, DeletePurchaseMutationVariables>;

/**
 * __useDeletePurchaseMutation__
 *
 * To run a mutation, you first call `useDeletePurchaseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePurchaseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePurchaseMutation, { data, loading, error }] = useDeletePurchaseMutation({
 *   variables: {
 *      purchaseId: // value for 'purchaseId'
 *   },
 * });
 */
export function useDeletePurchaseMutation(baseOptions?: Apollo.MutationHookOptions<DeletePurchaseMutation, DeletePurchaseMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeletePurchaseMutation, DeletePurchaseMutationVariables>(DeletePurchaseDocument, options);
      }
export type DeletePurchaseMutationHookResult = ReturnType<typeof useDeletePurchaseMutation>;
export type DeletePurchaseMutationResult = Apollo.MutationResult<DeletePurchaseMutation>;
export type DeletePurchaseMutationOptions = Apollo.BaseMutationOptions<DeletePurchaseMutation, DeletePurchaseMutationVariables>;
export const DeleteSaleDocument = gql`
    mutation DeleteSale($saleId: String!) {
  deleteSale(saleId: $saleId)
}
    `;
export type DeleteSaleMutationFn = Apollo.MutationFunction<DeleteSaleMutation, DeleteSaleMutationVariables>;

/**
 * __useDeleteSaleMutation__
 *
 * To run a mutation, you first call `useDeleteSaleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteSaleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteSaleMutation, { data, loading, error }] = useDeleteSaleMutation({
 *   variables: {
 *      saleId: // value for 'saleId'
 *   },
 * });
 */
export function useDeleteSaleMutation(baseOptions?: Apollo.MutationHookOptions<DeleteSaleMutation, DeleteSaleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteSaleMutation, DeleteSaleMutationVariables>(DeleteSaleDocument, options);
      }
export type DeleteSaleMutationHookResult = ReturnType<typeof useDeleteSaleMutation>;
export type DeleteSaleMutationResult = Apollo.MutationResult<DeleteSaleMutation>;
export type DeleteSaleMutationOptions = Apollo.BaseMutationOptions<DeleteSaleMutation, DeleteSaleMutationVariables>;
export const DeleteServiceDocument = gql`
    mutation DeleteService($serviceId: String!) {
  deleteService(serviceId: $serviceId)
}
    `;
export type DeleteServiceMutationFn = Apollo.MutationFunction<DeleteServiceMutation, DeleteServiceMutationVariables>;

/**
 * __useDeleteServiceMutation__
 *
 * To run a mutation, you first call `useDeleteServiceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteServiceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteServiceMutation, { data, loading, error }] = useDeleteServiceMutation({
 *   variables: {
 *      serviceId: // value for 'serviceId'
 *   },
 * });
 */
export function useDeleteServiceMutation(baseOptions?: Apollo.MutationHookOptions<DeleteServiceMutation, DeleteServiceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteServiceMutation, DeleteServiceMutationVariables>(DeleteServiceDocument, options);
      }
export type DeleteServiceMutationHookResult = ReturnType<typeof useDeleteServiceMutation>;
export type DeleteServiceMutationResult = Apollo.MutationResult<DeleteServiceMutation>;
export type DeleteServiceMutationOptions = Apollo.BaseMutationOptions<DeleteServiceMutation, DeleteServiceMutationVariables>;
export const EffectSaleExpenseDocument = gql`
    mutation EffectSaleExpense($expenseId: String!, $description: String!, $transactionDate: Date!, $file: String) {
  effectSaleExpense(
    input: {expenseId: $expenseId, description: $description, transactionDate: $transactionDate, file: $file}
  ) {
    effected
    saleStatus
  }
}
    `;
export type EffectSaleExpenseMutationFn = Apollo.MutationFunction<EffectSaleExpenseMutation, EffectSaleExpenseMutationVariables>;

/**
 * __useEffectSaleExpenseMutation__
 *
 * To run a mutation, you first call `useEffectSaleExpenseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEffectSaleExpenseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [effectSaleExpenseMutation, { data, loading, error }] = useEffectSaleExpenseMutation({
 *   variables: {
 *      expenseId: // value for 'expenseId'
 *      description: // value for 'description'
 *      transactionDate: // value for 'transactionDate'
 *      file: // value for 'file'
 *   },
 * });
 */
export function useEffectSaleExpenseMutation(baseOptions?: Apollo.MutationHookOptions<EffectSaleExpenseMutation, EffectSaleExpenseMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EffectSaleExpenseMutation, EffectSaleExpenseMutationVariables>(EffectSaleExpenseDocument, options);
      }
export type EffectSaleExpenseMutationHookResult = ReturnType<typeof useEffectSaleExpenseMutation>;
export type EffectSaleExpenseMutationResult = Apollo.MutationResult<EffectSaleExpenseMutation>;
export type EffectSaleExpenseMutationOptions = Apollo.BaseMutationOptions<EffectSaleExpenseMutation, EffectSaleExpenseMutationVariables>;
export const GetCombinedCoAsDocument = gql`
    query GetCombinedCOAs($businessId: String!) {
  getCombinedCOAs(businessId: $businessId) {
    id
    name
  }
}
    `;

/**
 * __useGetCombinedCoAsQuery__
 *
 * To run a query within a React component, call `useGetCombinedCoAsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCombinedCoAsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCombinedCoAsQuery({
 *   variables: {
 *      businessId: // value for 'businessId'
 *   },
 * });
 */
export function useGetCombinedCoAsQuery(baseOptions: Apollo.QueryHookOptions<GetCombinedCoAsQuery, GetCombinedCoAsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCombinedCoAsQuery, GetCombinedCoAsQueryVariables>(GetCombinedCoAsDocument, options);
      }
export function useGetCombinedCoAsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCombinedCoAsQuery, GetCombinedCoAsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCombinedCoAsQuery, GetCombinedCoAsQueryVariables>(GetCombinedCoAsDocument, options);
        }
export function useGetCombinedCoAsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetCombinedCoAsQuery, GetCombinedCoAsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetCombinedCoAsQuery, GetCombinedCoAsQueryVariables>(GetCombinedCoAsDocument, options);
        }
export type GetCombinedCoAsQueryHookResult = ReturnType<typeof useGetCombinedCoAsQuery>;
export type GetCombinedCoAsLazyQueryHookResult = ReturnType<typeof useGetCombinedCoAsLazyQuery>;
export type GetCombinedCoAsSuspenseQueryHookResult = ReturnType<typeof useGetCombinedCoAsSuspenseQuery>;
export type GetCombinedCoAsQueryResult = Apollo.QueryResult<GetCombinedCoAsQuery, GetCombinedCoAsQueryVariables>;
export const UploadDocument = gql`
    mutation Upload($image: Any!) {
  uploadFile(image: $image)
}
    `;
export type UploadMutationFn = Apollo.MutationFunction<UploadMutation, UploadMutationVariables>;

/**
 * __useUploadMutation__
 *
 * To run a mutation, you first call `useUploadMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUploadMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [uploadMutation, { data, loading, error }] = useUploadMutation({
 *   variables: {
 *      image: // value for 'image'
 *   },
 * });
 */
export function useUploadMutation(baseOptions?: Apollo.MutationHookOptions<UploadMutation, UploadMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UploadMutation, UploadMutationVariables>(UploadDocument, options);
      }
export type UploadMutationHookResult = ReturnType<typeof useUploadMutation>;
export type UploadMutationResult = Apollo.MutationResult<UploadMutation>;
export type UploadMutationOptions = Apollo.BaseMutationOptions<UploadMutation, UploadMutationVariables>;
export const ForgotPasswordDocument = gql`
    mutation ForgotPassword($email: String!) {
  forgotPassword(email: $email)
}
    `;
export type ForgotPasswordMutationFn = Apollo.MutationFunction<ForgotPasswordMutation, ForgotPasswordMutationVariables>;

/**
 * __useForgotPasswordMutation__
 *
 * To run a mutation, you first call `useForgotPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useForgotPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [forgotPasswordMutation, { data, loading, error }] = useForgotPasswordMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useForgotPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument, options);
      }
export type ForgotPasswordMutationHookResult = ReturnType<typeof useForgotPasswordMutation>;
export type ForgotPasswordMutationResult = Apollo.MutationResult<ForgotPasswordMutation>;
export type ForgotPasswordMutationOptions = Apollo.BaseMutationOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>;
export const GetAddOnOptionsDocument = gql`
    query GetAddOnOptions {
  getAddOnOptions {
    id
    addOnName
    addOnPrice
  }
}
    `;

/**
 * __useGetAddOnOptionsQuery__
 *
 * To run a query within a React component, call `useGetAddOnOptionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAddOnOptionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAddOnOptionsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAddOnOptionsQuery(baseOptions?: Apollo.QueryHookOptions<GetAddOnOptionsQuery, GetAddOnOptionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAddOnOptionsQuery, GetAddOnOptionsQueryVariables>(GetAddOnOptionsDocument, options);
      }
export function useGetAddOnOptionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAddOnOptionsQuery, GetAddOnOptionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAddOnOptionsQuery, GetAddOnOptionsQueryVariables>(GetAddOnOptionsDocument, options);
        }
export function useGetAddOnOptionsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetAddOnOptionsQuery, GetAddOnOptionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAddOnOptionsQuery, GetAddOnOptionsQueryVariables>(GetAddOnOptionsDocument, options);
        }
export type GetAddOnOptionsQueryHookResult = ReturnType<typeof useGetAddOnOptionsQuery>;
export type GetAddOnOptionsLazyQueryHookResult = ReturnType<typeof useGetAddOnOptionsLazyQuery>;
export type GetAddOnOptionsSuspenseQueryHookResult = ReturnType<typeof useGetAddOnOptionsSuspenseQuery>;
export type GetAddOnOptionsQueryResult = Apollo.QueryResult<GetAddOnOptionsQuery, GetAddOnOptionsQueryVariables>;
export const GetBusinessCoaByBusinessDocument = gql`
    query GetBusinessCOAByBusiness($businessId: String!) {
  getBusinessCOAByBusiness(businessId: $businessId) {
    id
    name
    code
  }
}
    `;

/**
 * __useGetBusinessCoaByBusinessQuery__
 *
 * To run a query within a React component, call `useGetBusinessCoaByBusinessQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBusinessCoaByBusinessQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBusinessCoaByBusinessQuery({
 *   variables: {
 *      businessId: // value for 'businessId'
 *   },
 * });
 */
export function useGetBusinessCoaByBusinessQuery(baseOptions: Apollo.QueryHookOptions<GetBusinessCoaByBusinessQuery, GetBusinessCoaByBusinessQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetBusinessCoaByBusinessQuery, GetBusinessCoaByBusinessQueryVariables>(GetBusinessCoaByBusinessDocument, options);
      }
export function useGetBusinessCoaByBusinessLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBusinessCoaByBusinessQuery, GetBusinessCoaByBusinessQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetBusinessCoaByBusinessQuery, GetBusinessCoaByBusinessQueryVariables>(GetBusinessCoaByBusinessDocument, options);
        }
export function useGetBusinessCoaByBusinessSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetBusinessCoaByBusinessQuery, GetBusinessCoaByBusinessQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetBusinessCoaByBusinessQuery, GetBusinessCoaByBusinessQueryVariables>(GetBusinessCoaByBusinessDocument, options);
        }
export type GetBusinessCoaByBusinessQueryHookResult = ReturnType<typeof useGetBusinessCoaByBusinessQuery>;
export type GetBusinessCoaByBusinessLazyQueryHookResult = ReturnType<typeof useGetBusinessCoaByBusinessLazyQuery>;
export type GetBusinessCoaByBusinessSuspenseQueryHookResult = ReturnType<typeof useGetBusinessCoaByBusinessSuspenseQuery>;
export type GetBusinessCoaByBusinessQueryResult = Apollo.QueryResult<GetBusinessCoaByBusinessQuery, GetBusinessCoaByBusinessQueryVariables>;
export const GetBusinessByIdDocument = gql`
    query GetBusinessById($businessId: String!) {
  getBusinessById(businessId: $businessId) {
    id
    businessName
    businessEmail
    businessMobile
    businessCategory {
      categoryName
    }
    createdAt
  }
}
    `;

/**
 * __useGetBusinessByIdQuery__
 *
 * To run a query within a React component, call `useGetBusinessByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBusinessByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBusinessByIdQuery({
 *   variables: {
 *      businessId: // value for 'businessId'
 *   },
 * });
 */
export function useGetBusinessByIdQuery(baseOptions: Apollo.QueryHookOptions<GetBusinessByIdQuery, GetBusinessByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetBusinessByIdQuery, GetBusinessByIdQueryVariables>(GetBusinessByIdDocument, options);
      }
export function useGetBusinessByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBusinessByIdQuery, GetBusinessByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetBusinessByIdQuery, GetBusinessByIdQueryVariables>(GetBusinessByIdDocument, options);
        }
export function useGetBusinessByIdSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetBusinessByIdQuery, GetBusinessByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetBusinessByIdQuery, GetBusinessByIdQueryVariables>(GetBusinessByIdDocument, options);
        }
export type GetBusinessByIdQueryHookResult = ReturnType<typeof useGetBusinessByIdQuery>;
export type GetBusinessByIdLazyQueryHookResult = ReturnType<typeof useGetBusinessByIdLazyQuery>;
export type GetBusinessByIdSuspenseQueryHookResult = ReturnType<typeof useGetBusinessByIdSuspenseQuery>;
export type GetBusinessByIdQueryResult = Apollo.QueryResult<GetBusinessByIdQuery, GetBusinessByIdQueryVariables>;
export const GetBusinessesByUserIdDocument = gql`
    query GetBusinessesByUserId {
  getBusinessesByUserId {
    user {
      id
      email
      fullname
      verified
    }
    businesses {
      id
      businessName
      businessEmail
      businessMobile
    }
  }
}
    `;

/**
 * __useGetBusinessesByUserIdQuery__
 *
 * To run a query within a React component, call `useGetBusinessesByUserIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBusinessesByUserIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBusinessesByUserIdQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetBusinessesByUserIdQuery(baseOptions?: Apollo.QueryHookOptions<GetBusinessesByUserIdQuery, GetBusinessesByUserIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetBusinessesByUserIdQuery, GetBusinessesByUserIdQueryVariables>(GetBusinessesByUserIdDocument, options);
      }
export function useGetBusinessesByUserIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBusinessesByUserIdQuery, GetBusinessesByUserIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetBusinessesByUserIdQuery, GetBusinessesByUserIdQueryVariables>(GetBusinessesByUserIdDocument, options);
        }
export function useGetBusinessesByUserIdSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetBusinessesByUserIdQuery, GetBusinessesByUserIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetBusinessesByUserIdQuery, GetBusinessesByUserIdQueryVariables>(GetBusinessesByUserIdDocument, options);
        }
export type GetBusinessesByUserIdQueryHookResult = ReturnType<typeof useGetBusinessesByUserIdQuery>;
export type GetBusinessesByUserIdLazyQueryHookResult = ReturnType<typeof useGetBusinessesByUserIdLazyQuery>;
export type GetBusinessesByUserIdSuspenseQueryHookResult = ReturnType<typeof useGetBusinessesByUserIdSuspenseQuery>;
export type GetBusinessesByUserIdQueryResult = Apollo.QueryResult<GetBusinessesByUserIdQuery, GetBusinessesByUserIdQueryVariables>;
export const GetBusinessCoAsDocument = gql`
    query GetBusinessCOAs {
  getBusinessCOAs {
    id
    name
    code
    createdAt
  }
}
    `;

/**
 * __useGetBusinessCoAsQuery__
 *
 * To run a query within a React component, call `useGetBusinessCoAsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBusinessCoAsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBusinessCoAsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetBusinessCoAsQuery(baseOptions?: Apollo.QueryHookOptions<GetBusinessCoAsQuery, GetBusinessCoAsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetBusinessCoAsQuery, GetBusinessCoAsQueryVariables>(GetBusinessCoAsDocument, options);
      }
export function useGetBusinessCoAsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBusinessCoAsQuery, GetBusinessCoAsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetBusinessCoAsQuery, GetBusinessCoAsQueryVariables>(GetBusinessCoAsDocument, options);
        }
export function useGetBusinessCoAsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetBusinessCoAsQuery, GetBusinessCoAsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetBusinessCoAsQuery, GetBusinessCoAsQueryVariables>(GetBusinessCoAsDocument, options);
        }
export type GetBusinessCoAsQueryHookResult = ReturnType<typeof useGetBusinessCoAsQuery>;
export type GetBusinessCoAsLazyQueryHookResult = ReturnType<typeof useGetBusinessCoAsLazyQuery>;
export type GetBusinessCoAsSuspenseQueryHookResult = ReturnType<typeof useGetBusinessCoAsSuspenseQuery>;
export type GetBusinessCoAsQueryResult = Apollo.QueryResult<GetBusinessCoAsQuery, GetBusinessCoAsQueryVariables>;
export const GetBusinessCategoriesDocument = gql`
    query GetBusinessCategories {
  getBusinessCategories {
    id
    categoryName
    createdAt
  }
}
    `;

/**
 * __useGetBusinessCategoriesQuery__
 *
 * To run a query within a React component, call `useGetBusinessCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBusinessCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBusinessCategoriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetBusinessCategoriesQuery(baseOptions?: Apollo.QueryHookOptions<GetBusinessCategoriesQuery, GetBusinessCategoriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetBusinessCategoriesQuery, GetBusinessCategoriesQueryVariables>(GetBusinessCategoriesDocument, options);
      }
export function useGetBusinessCategoriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBusinessCategoriesQuery, GetBusinessCategoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetBusinessCategoriesQuery, GetBusinessCategoriesQueryVariables>(GetBusinessCategoriesDocument, options);
        }
export function useGetBusinessCategoriesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetBusinessCategoriesQuery, GetBusinessCategoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetBusinessCategoriesQuery, GetBusinessCategoriesQueryVariables>(GetBusinessCategoriesDocument, options);
        }
export type GetBusinessCategoriesQueryHookResult = ReturnType<typeof useGetBusinessCategoriesQuery>;
export type GetBusinessCategoriesLazyQueryHookResult = ReturnType<typeof useGetBusinessCategoriesLazyQuery>;
export type GetBusinessCategoriesSuspenseQueryHookResult = ReturnType<typeof useGetBusinessCategoriesSuspenseQuery>;
export type GetBusinessCategoriesQueryResult = Apollo.QueryResult<GetBusinessCategoriesQuery, GetBusinessCategoriesQueryVariables>;
export const GetBusinessProductUnitsDocument = gql`
    query GetBusinessProductUnits($businessId: String!) {
  getBusinessProductUnits(businessId: $businessId) {
    id
    unitName
  }
}
    `;

/**
 * __useGetBusinessProductUnitsQuery__
 *
 * To run a query within a React component, call `useGetBusinessProductUnitsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBusinessProductUnitsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBusinessProductUnitsQuery({
 *   variables: {
 *      businessId: // value for 'businessId'
 *   },
 * });
 */
export function useGetBusinessProductUnitsQuery(baseOptions: Apollo.QueryHookOptions<GetBusinessProductUnitsQuery, GetBusinessProductUnitsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetBusinessProductUnitsQuery, GetBusinessProductUnitsQueryVariables>(GetBusinessProductUnitsDocument, options);
      }
export function useGetBusinessProductUnitsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBusinessProductUnitsQuery, GetBusinessProductUnitsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetBusinessProductUnitsQuery, GetBusinessProductUnitsQueryVariables>(GetBusinessProductUnitsDocument, options);
        }
export function useGetBusinessProductUnitsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetBusinessProductUnitsQuery, GetBusinessProductUnitsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetBusinessProductUnitsQuery, GetBusinessProductUnitsQueryVariables>(GetBusinessProductUnitsDocument, options);
        }
export type GetBusinessProductUnitsQueryHookResult = ReturnType<typeof useGetBusinessProductUnitsQuery>;
export type GetBusinessProductUnitsLazyQueryHookResult = ReturnType<typeof useGetBusinessProductUnitsLazyQuery>;
export type GetBusinessProductUnitsSuspenseQueryHookResult = ReturnType<typeof useGetBusinessProductUnitsSuspenseQuery>;
export type GetBusinessProductUnitsQueryResult = Apollo.QueryResult<GetBusinessProductUnitsQuery, GetBusinessProductUnitsQueryVariables>;
export const GetChartOfAccountsDocument = gql`
    query GetChartOfAccounts {
  getChartOfAccounts {
    id
    name
    code
    createdAt
  }
}
    `;

/**
 * __useGetChartOfAccountsQuery__
 *
 * To run a query within a React component, call `useGetChartOfAccountsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetChartOfAccountsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetChartOfAccountsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetChartOfAccountsQuery(baseOptions?: Apollo.QueryHookOptions<GetChartOfAccountsQuery, GetChartOfAccountsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetChartOfAccountsQuery, GetChartOfAccountsQueryVariables>(GetChartOfAccountsDocument, options);
      }
export function useGetChartOfAccountsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetChartOfAccountsQuery, GetChartOfAccountsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetChartOfAccountsQuery, GetChartOfAccountsQueryVariables>(GetChartOfAccountsDocument, options);
        }
export function useGetChartOfAccountsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetChartOfAccountsQuery, GetChartOfAccountsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetChartOfAccountsQuery, GetChartOfAccountsQueryVariables>(GetChartOfAccountsDocument, options);
        }
export type GetChartOfAccountsQueryHookResult = ReturnType<typeof useGetChartOfAccountsQuery>;
export type GetChartOfAccountsLazyQueryHookResult = ReturnType<typeof useGetChartOfAccountsLazyQuery>;
export type GetChartOfAccountsSuspenseQueryHookResult = ReturnType<typeof useGetChartOfAccountsSuspenseQuery>;
export type GetChartOfAccountsQueryResult = Apollo.QueryResult<GetChartOfAccountsQuery, GetChartOfAccountsQueryVariables>;
export const GetCustomerByIdDocument = gql`
    query GetCustomerById($customerId: String!) {
  getCustomerById(customerId: $customerId) {
    id
    name
    address
    mobile
    email
  }
}
    `;

/**
 * __useGetCustomerByIdQuery__
 *
 * To run a query within a React component, call `useGetCustomerByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCustomerByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCustomerByIdQuery({
 *   variables: {
 *      customerId: // value for 'customerId'
 *   },
 * });
 */
export function useGetCustomerByIdQuery(baseOptions: Apollo.QueryHookOptions<GetCustomerByIdQuery, GetCustomerByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCustomerByIdQuery, GetCustomerByIdQueryVariables>(GetCustomerByIdDocument, options);
      }
export function useGetCustomerByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCustomerByIdQuery, GetCustomerByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCustomerByIdQuery, GetCustomerByIdQueryVariables>(GetCustomerByIdDocument, options);
        }
export function useGetCustomerByIdSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetCustomerByIdQuery, GetCustomerByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetCustomerByIdQuery, GetCustomerByIdQueryVariables>(GetCustomerByIdDocument, options);
        }
export type GetCustomerByIdQueryHookResult = ReturnType<typeof useGetCustomerByIdQuery>;
export type GetCustomerByIdLazyQueryHookResult = ReturnType<typeof useGetCustomerByIdLazyQuery>;
export type GetCustomerByIdSuspenseQueryHookResult = ReturnType<typeof useGetCustomerByIdSuspenseQuery>;
export type GetCustomerByIdQueryResult = Apollo.QueryResult<GetCustomerByIdQuery, GetCustomerByIdQueryVariables>;
export const GetCustomersDocument = gql`
    query GetCustomers {
  getCustomers {
    id
    name
    mobile
    email
    address
  }
}
    `;

/**
 * __useGetCustomersQuery__
 *
 * To run a query within a React component, call `useGetCustomersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCustomersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCustomersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCustomersQuery(baseOptions?: Apollo.QueryHookOptions<GetCustomersQuery, GetCustomersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCustomersQuery, GetCustomersQueryVariables>(GetCustomersDocument, options);
      }
export function useGetCustomersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCustomersQuery, GetCustomersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCustomersQuery, GetCustomersQueryVariables>(GetCustomersDocument, options);
        }
export function useGetCustomersSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetCustomersQuery, GetCustomersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetCustomersQuery, GetCustomersQueryVariables>(GetCustomersDocument, options);
        }
export type GetCustomersQueryHookResult = ReturnType<typeof useGetCustomersQuery>;
export type GetCustomersLazyQueryHookResult = ReturnType<typeof useGetCustomersLazyQuery>;
export type GetCustomersSuspenseQueryHookResult = ReturnType<typeof useGetCustomersSuspenseQuery>;
export type GetCustomersQueryResult = Apollo.QueryResult<GetCustomersQuery, GetCustomersQueryVariables>;
export const GetCustomerByBusinessDocument = gql`
    query GetCustomerByBusiness($businessId: String!, $cursor: String, $sets: Float) {
  getCustomerByBusiness(businessId: $businessId, cursor: $cursor, sets: $sets) {
    customerByBusiness {
      id
      name
      email
      mobile
      createdAt
      address
      isArchived
      invoices {
        totalAmount
        createdAt
      }
    }
    cursorId
  }
}
    `;

/**
 * __useGetCustomerByBusinessQuery__
 *
 * To run a query within a React component, call `useGetCustomerByBusinessQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCustomerByBusinessQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCustomerByBusinessQuery({
 *   variables: {
 *      businessId: // value for 'businessId'
 *      cursor: // value for 'cursor'
 *      sets: // value for 'sets'
 *   },
 * });
 */
export function useGetCustomerByBusinessQuery(baseOptions: Apollo.QueryHookOptions<GetCustomerByBusinessQuery, GetCustomerByBusinessQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCustomerByBusinessQuery, GetCustomerByBusinessQueryVariables>(GetCustomerByBusinessDocument, options);
      }
export function useGetCustomerByBusinessLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCustomerByBusinessQuery, GetCustomerByBusinessQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCustomerByBusinessQuery, GetCustomerByBusinessQueryVariables>(GetCustomerByBusinessDocument, options);
        }
export function useGetCustomerByBusinessSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetCustomerByBusinessQuery, GetCustomerByBusinessQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetCustomerByBusinessQuery, GetCustomerByBusinessQueryVariables>(GetCustomerByBusinessDocument, options);
        }
export type GetCustomerByBusinessQueryHookResult = ReturnType<typeof useGetCustomerByBusinessQuery>;
export type GetCustomerByBusinessLazyQueryHookResult = ReturnType<typeof useGetCustomerByBusinessLazyQuery>;
export type GetCustomerByBusinessSuspenseQueryHookResult = ReturnType<typeof useGetCustomerByBusinessSuspenseQuery>;
export type GetCustomerByBusinessQueryResult = Apollo.QueryResult<GetCustomerByBusinessQuery, GetCustomerByBusinessQueryVariables>;
export const GetDailyExpensesForMonthDocument = gql`
    query GetDailyExpensesForMonth($businessId: String!, $month: Float!, $year: Float!) {
  getDailyExpensesForMonth(businessId: $businessId, month: $month, year: $year) {
    expenseDate
    totalExpenses
  }
}
    `;

/**
 * __useGetDailyExpensesForMonthQuery__
 *
 * To run a query within a React component, call `useGetDailyExpensesForMonthQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDailyExpensesForMonthQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDailyExpensesForMonthQuery({
 *   variables: {
 *      businessId: // value for 'businessId'
 *      month: // value for 'month'
 *      year: // value for 'year'
 *   },
 * });
 */
export function useGetDailyExpensesForMonthQuery(baseOptions: Apollo.QueryHookOptions<GetDailyExpensesForMonthQuery, GetDailyExpensesForMonthQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetDailyExpensesForMonthQuery, GetDailyExpensesForMonthQueryVariables>(GetDailyExpensesForMonthDocument, options);
      }
export function useGetDailyExpensesForMonthLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetDailyExpensesForMonthQuery, GetDailyExpensesForMonthQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetDailyExpensesForMonthQuery, GetDailyExpensesForMonthQueryVariables>(GetDailyExpensesForMonthDocument, options);
        }
export function useGetDailyExpensesForMonthSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetDailyExpensesForMonthQuery, GetDailyExpensesForMonthQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetDailyExpensesForMonthQuery, GetDailyExpensesForMonthQueryVariables>(GetDailyExpensesForMonthDocument, options);
        }
export type GetDailyExpensesForMonthQueryHookResult = ReturnType<typeof useGetDailyExpensesForMonthQuery>;
export type GetDailyExpensesForMonthLazyQueryHookResult = ReturnType<typeof useGetDailyExpensesForMonthLazyQuery>;
export type GetDailyExpensesForMonthSuspenseQueryHookResult = ReturnType<typeof useGetDailyExpensesForMonthSuspenseQuery>;
export type GetDailyExpensesForMonthQueryResult = Apollo.QueryResult<GetDailyExpensesForMonthQuery, GetDailyExpensesForMonthQueryVariables>;
export const GetExpenseByIdDocument = gql`
    query GetExpenseById($expenseId: String!) {
  getExpenseById(expenseId: $expenseId) {
    id
    description
    amount
    expenseDate
    merchant {
      name
      email
      id
    }
    paid
    expenseCategory {
      name
      id
    }
    createdAt
    expenseStatusId
    merchant {
      name
      email
      id
    }
    expenseItems {
      chartOfAccount {
        name
        id
      }
      id
      quantityReceived
      received
      description
      quantity
      unitPrice
      index
      price
    }
    expenseLines {
      lineAmount
      lineQuantity
      id
      chartOfAccount {
        name
      }
    }
  }
}
    `;

/**
 * __useGetExpenseByIdQuery__
 *
 * To run a query within a React component, call `useGetExpenseByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetExpenseByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetExpenseByIdQuery({
 *   variables: {
 *      expenseId: // value for 'expenseId'
 *   },
 * });
 */
export function useGetExpenseByIdQuery(baseOptions: Apollo.QueryHookOptions<GetExpenseByIdQuery, GetExpenseByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetExpenseByIdQuery, GetExpenseByIdQueryVariables>(GetExpenseByIdDocument, options);
      }
export function useGetExpenseByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetExpenseByIdQuery, GetExpenseByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetExpenseByIdQuery, GetExpenseByIdQueryVariables>(GetExpenseByIdDocument, options);
        }
export function useGetExpenseByIdSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetExpenseByIdQuery, GetExpenseByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetExpenseByIdQuery, GetExpenseByIdQueryVariables>(GetExpenseByIdDocument, options);
        }
export type GetExpenseByIdQueryHookResult = ReturnType<typeof useGetExpenseByIdQuery>;
export type GetExpenseByIdLazyQueryHookResult = ReturnType<typeof useGetExpenseByIdLazyQuery>;
export type GetExpenseByIdSuspenseQueryHookResult = ReturnType<typeof useGetExpenseByIdSuspenseQuery>;
export type GetExpenseByIdQueryResult = Apollo.QueryResult<GetExpenseByIdQuery, GetExpenseByIdQueryVariables>;
export const GetExpenseCategoryWithSetsDocument = gql`
    query GetExpenseCategoryWithSets($cursor: String, $sets: Float) {
  getExpenseCategoryWithSets(cursor: $cursor, sets: $sets) {
    expenseCategories {
      id
      name
    }
    cursorId
  }
}
    `;

/**
 * __useGetExpenseCategoryWithSetsQuery__
 *
 * To run a query within a React component, call `useGetExpenseCategoryWithSetsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetExpenseCategoryWithSetsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetExpenseCategoryWithSetsQuery({
 *   variables: {
 *      cursor: // value for 'cursor'
 *      sets: // value for 'sets'
 *   },
 * });
 */
export function useGetExpenseCategoryWithSetsQuery(baseOptions?: Apollo.QueryHookOptions<GetExpenseCategoryWithSetsQuery, GetExpenseCategoryWithSetsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetExpenseCategoryWithSetsQuery, GetExpenseCategoryWithSetsQueryVariables>(GetExpenseCategoryWithSetsDocument, options);
      }
export function useGetExpenseCategoryWithSetsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetExpenseCategoryWithSetsQuery, GetExpenseCategoryWithSetsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetExpenseCategoryWithSetsQuery, GetExpenseCategoryWithSetsQueryVariables>(GetExpenseCategoryWithSetsDocument, options);
        }
export function useGetExpenseCategoryWithSetsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetExpenseCategoryWithSetsQuery, GetExpenseCategoryWithSetsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetExpenseCategoryWithSetsQuery, GetExpenseCategoryWithSetsQueryVariables>(GetExpenseCategoryWithSetsDocument, options);
        }
export type GetExpenseCategoryWithSetsQueryHookResult = ReturnType<typeof useGetExpenseCategoryWithSetsQuery>;
export type GetExpenseCategoryWithSetsLazyQueryHookResult = ReturnType<typeof useGetExpenseCategoryWithSetsLazyQuery>;
export type GetExpenseCategoryWithSetsSuspenseQueryHookResult = ReturnType<typeof useGetExpenseCategoryWithSetsSuspenseQuery>;
export type GetExpenseCategoryWithSetsQueryResult = Apollo.QueryResult<GetExpenseCategoryWithSetsQuery, GetExpenseCategoryWithSetsQueryVariables>;
export const GetExpenseForMonthDocument = gql`
    query GetExpenseForMonth($businessId: String!, $monthly: Boolean) {
  getExpensesForMonth(businessId: $businessId, monthly: $monthly) {
    totalExpenseAmountThisMonth
    percentageOfExpenseToInvoiceThisMonth
    percentageIncreaseInExpenseThisMonth
  }
}
    `;

/**
 * __useGetExpenseForMonthQuery__
 *
 * To run a query within a React component, call `useGetExpenseForMonthQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetExpenseForMonthQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetExpenseForMonthQuery({
 *   variables: {
 *      businessId: // value for 'businessId'
 *      monthly: // value for 'monthly'
 *   },
 * });
 */
export function useGetExpenseForMonthQuery(baseOptions: Apollo.QueryHookOptions<GetExpenseForMonthQuery, GetExpenseForMonthQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetExpenseForMonthQuery, GetExpenseForMonthQueryVariables>(GetExpenseForMonthDocument, options);
      }
export function useGetExpenseForMonthLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetExpenseForMonthQuery, GetExpenseForMonthQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetExpenseForMonthQuery, GetExpenseForMonthQueryVariables>(GetExpenseForMonthDocument, options);
        }
export function useGetExpenseForMonthSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetExpenseForMonthQuery, GetExpenseForMonthQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetExpenseForMonthQuery, GetExpenseForMonthQueryVariables>(GetExpenseForMonthDocument, options);
        }
export type GetExpenseForMonthQueryHookResult = ReturnType<typeof useGetExpenseForMonthQuery>;
export type GetExpenseForMonthLazyQueryHookResult = ReturnType<typeof useGetExpenseForMonthLazyQuery>;
export type GetExpenseForMonthSuspenseQueryHookResult = ReturnType<typeof useGetExpenseForMonthSuspenseQuery>;
export type GetExpenseForMonthQueryResult = Apollo.QueryResult<GetExpenseForMonthQuery, GetExpenseForMonthQueryVariables>;
export const GetExpenseForQuarterDocument = gql`
    query GetExpenseForQuarter($businessId: String!, $quarterly: Boolean) {
  getExpensesForQuarter(businessId: $businessId, quarterly: $quarterly) {
    totalExpenseAmountThisQuarter
    percentageOfExpenseToInvoiceThisQuarter
    percentageIncreaseInExpensesThisQuarter
  }
}
    `;

/**
 * __useGetExpenseForQuarterQuery__
 *
 * To run a query within a React component, call `useGetExpenseForQuarterQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetExpenseForQuarterQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetExpenseForQuarterQuery({
 *   variables: {
 *      businessId: // value for 'businessId'
 *      quarterly: // value for 'quarterly'
 *   },
 * });
 */
export function useGetExpenseForQuarterQuery(baseOptions: Apollo.QueryHookOptions<GetExpenseForQuarterQuery, GetExpenseForQuarterQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetExpenseForQuarterQuery, GetExpenseForQuarterQueryVariables>(GetExpenseForQuarterDocument, options);
      }
export function useGetExpenseForQuarterLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetExpenseForQuarterQuery, GetExpenseForQuarterQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetExpenseForQuarterQuery, GetExpenseForQuarterQueryVariables>(GetExpenseForQuarterDocument, options);
        }
export function useGetExpenseForQuarterSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetExpenseForQuarterQuery, GetExpenseForQuarterQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetExpenseForQuarterQuery, GetExpenseForQuarterQueryVariables>(GetExpenseForQuarterDocument, options);
        }
export type GetExpenseForQuarterQueryHookResult = ReturnType<typeof useGetExpenseForQuarterQuery>;
export type GetExpenseForQuarterLazyQueryHookResult = ReturnType<typeof useGetExpenseForQuarterLazyQuery>;
export type GetExpenseForQuarterSuspenseQueryHookResult = ReturnType<typeof useGetExpenseForQuarterSuspenseQuery>;
export type GetExpenseForQuarterQueryResult = Apollo.QueryResult<GetExpenseForQuarterQuery, GetExpenseForQuarterQueryVariables>;
export const GetExpenseForWeekDocument = gql`
    query GetExpenseForWeek($businessId: String!, $weekly: Boolean) {
  getExpensesForWeek(businessId: $businessId, weekly: $weekly) {
    totalExpenseAmountThisWeek
    percentageOfExpenseToInvoiceThisWeek
    percentageIncreaseInExpenseThisWeek
  }
}
    `;

/**
 * __useGetExpenseForWeekQuery__
 *
 * To run a query within a React component, call `useGetExpenseForWeekQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetExpenseForWeekQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetExpenseForWeekQuery({
 *   variables: {
 *      businessId: // value for 'businessId'
 *      weekly: // value for 'weekly'
 *   },
 * });
 */
export function useGetExpenseForWeekQuery(baseOptions: Apollo.QueryHookOptions<GetExpenseForWeekQuery, GetExpenseForWeekQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetExpenseForWeekQuery, GetExpenseForWeekQueryVariables>(GetExpenseForWeekDocument, options);
      }
export function useGetExpenseForWeekLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetExpenseForWeekQuery, GetExpenseForWeekQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetExpenseForWeekQuery, GetExpenseForWeekQueryVariables>(GetExpenseForWeekDocument, options);
        }
export function useGetExpenseForWeekSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetExpenseForWeekQuery, GetExpenseForWeekQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetExpenseForWeekQuery, GetExpenseForWeekQueryVariables>(GetExpenseForWeekDocument, options);
        }
export type GetExpenseForWeekQueryHookResult = ReturnType<typeof useGetExpenseForWeekQuery>;
export type GetExpenseForWeekLazyQueryHookResult = ReturnType<typeof useGetExpenseForWeekLazyQuery>;
export type GetExpenseForWeekSuspenseQueryHookResult = ReturnType<typeof useGetExpenseForWeekSuspenseQuery>;
export type GetExpenseForWeekQueryResult = Apollo.QueryResult<GetExpenseForWeekQuery, GetExpenseForWeekQueryVariables>;
export const GetExpenseForYearDocument = gql`
    query GetExpenseForYear($businessId: String!, $yearly: Boolean) {
  getExpensesForYear(businessId: $businessId, yearly: $yearly) {
    totalExpenseAmountThisYear
    percentageOfExpenseToInvoiceThisYear
    percentageIncreaseInExpensesThisYear
  }
}
    `;

/**
 * __useGetExpenseForYearQuery__
 *
 * To run a query within a React component, call `useGetExpenseForYearQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetExpenseForYearQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetExpenseForYearQuery({
 *   variables: {
 *      businessId: // value for 'businessId'
 *      yearly: // value for 'yearly'
 *   },
 * });
 */
export function useGetExpenseForYearQuery(baseOptions: Apollo.QueryHookOptions<GetExpenseForYearQuery, GetExpenseForYearQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetExpenseForYearQuery, GetExpenseForYearQueryVariables>(GetExpenseForYearDocument, options);
      }
export function useGetExpenseForYearLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetExpenseForYearQuery, GetExpenseForYearQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetExpenseForYearQuery, GetExpenseForYearQueryVariables>(GetExpenseForYearDocument, options);
        }
export function useGetExpenseForYearSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetExpenseForYearQuery, GetExpenseForYearQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetExpenseForYearQuery, GetExpenseForYearQueryVariables>(GetExpenseForYearDocument, options);
        }
export type GetExpenseForYearQueryHookResult = ReturnType<typeof useGetExpenseForYearQuery>;
export type GetExpenseForYearLazyQueryHookResult = ReturnType<typeof useGetExpenseForYearLazyQuery>;
export type GetExpenseForYearSuspenseQueryHookResult = ReturnType<typeof useGetExpenseForYearSuspenseQuery>;
export type GetExpenseForYearQueryResult = Apollo.QueryResult<GetExpenseForYearQuery, GetExpenseForYearQueryVariables>;
export const GetExpensesByBusinessDocument = gql`
    query GetExpensesByBusiness($businessId: String!, $sets: Float, $cursor: String) {
  getExpenseByBusiness(businessId: $businessId, sets: $sets, cursor: $cursor) {
    expenseByBusiness {
      id
      description
      amount
      paid
      archived
      expenseCategory {
        name
        id
      }
      expenseDate
      business {
        businessName
      }
      merchant {
        name
        id
      }
      recurring
    }
    cursorId
  }
}
    `;

/**
 * __useGetExpensesByBusinessQuery__
 *
 * To run a query within a React component, call `useGetExpensesByBusinessQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetExpensesByBusinessQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetExpensesByBusinessQuery({
 *   variables: {
 *      businessId: // value for 'businessId'
 *      sets: // value for 'sets'
 *      cursor: // value for 'cursor'
 *   },
 * });
 */
export function useGetExpensesByBusinessQuery(baseOptions: Apollo.QueryHookOptions<GetExpensesByBusinessQuery, GetExpensesByBusinessQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetExpensesByBusinessQuery, GetExpensesByBusinessQueryVariables>(GetExpensesByBusinessDocument, options);
      }
export function useGetExpensesByBusinessLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetExpensesByBusinessQuery, GetExpensesByBusinessQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetExpensesByBusinessQuery, GetExpensesByBusinessQueryVariables>(GetExpensesByBusinessDocument, options);
        }
export function useGetExpensesByBusinessSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetExpensesByBusinessQuery, GetExpensesByBusinessQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetExpensesByBusinessQuery, GetExpensesByBusinessQueryVariables>(GetExpensesByBusinessDocument, options);
        }
export type GetExpensesByBusinessQueryHookResult = ReturnType<typeof useGetExpensesByBusinessQuery>;
export type GetExpensesByBusinessLazyQueryHookResult = ReturnType<typeof useGetExpensesByBusinessLazyQuery>;
export type GetExpensesByBusinessSuspenseQueryHookResult = ReturnType<typeof useGetExpensesByBusinessSuspenseQuery>;
export type GetExpensesByBusinessQueryResult = Apollo.QueryResult<GetExpensesByBusinessQuery, GetExpensesByBusinessQueryVariables>;
export const GetExpenseByBusinessMobileDocument = gql`
    query GetExpenseByBusinessMobile($businessId: String!, $cursor: String, $take: Float) {
  getExpenseByBusinessMobile(
    businessId: $businessId
    cursor: $cursor
    take: $take
  ) {
    expenseByBusiness {
      id
      description
      amount
      expenseDate
    }
    cursorId
  }
}
    `;

/**
 * __useGetExpenseByBusinessMobileQuery__
 *
 * To run a query within a React component, call `useGetExpenseByBusinessMobileQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetExpenseByBusinessMobileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetExpenseByBusinessMobileQuery({
 *   variables: {
 *      businessId: // value for 'businessId'
 *      cursor: // value for 'cursor'
 *      take: // value for 'take'
 *   },
 * });
 */
export function useGetExpenseByBusinessMobileQuery(baseOptions: Apollo.QueryHookOptions<GetExpenseByBusinessMobileQuery, GetExpenseByBusinessMobileQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetExpenseByBusinessMobileQuery, GetExpenseByBusinessMobileQueryVariables>(GetExpenseByBusinessMobileDocument, options);
      }
export function useGetExpenseByBusinessMobileLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetExpenseByBusinessMobileQuery, GetExpenseByBusinessMobileQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetExpenseByBusinessMobileQuery, GetExpenseByBusinessMobileQueryVariables>(GetExpenseByBusinessMobileDocument, options);
        }
export function useGetExpenseByBusinessMobileSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetExpenseByBusinessMobileQuery, GetExpenseByBusinessMobileQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetExpenseByBusinessMobileQuery, GetExpenseByBusinessMobileQueryVariables>(GetExpenseByBusinessMobileDocument, options);
        }
export type GetExpenseByBusinessMobileQueryHookResult = ReturnType<typeof useGetExpenseByBusinessMobileQuery>;
export type GetExpenseByBusinessMobileLazyQueryHookResult = ReturnType<typeof useGetExpenseByBusinessMobileLazyQuery>;
export type GetExpenseByBusinessMobileSuspenseQueryHookResult = ReturnType<typeof useGetExpenseByBusinessMobileSuspenseQuery>;
export type GetExpenseByBusinessMobileQueryResult = Apollo.QueryResult<GetExpenseByBusinessMobileQuery, GetExpenseByBusinessMobileQueryVariables>;
export const GetInvoicesByBusinessDocument = gql`
    query GetInvoicesByBusiness($businessId: String!, $cursor: String, $sets: Float) {
  getInvoiceByBusiness(businessId: $businessId, cursor: $cursor, sets: $sets) {
    invoicesByBusiness {
      id
      totalAmount
      createdAt
      subtotal
      VAT
      discount
      dateOfIssue
      dueDate
      customer {
        id
        name
        email
        address
      }
      business {
        id
        businessName
        businessEmail
      }
      invoiceDetails {
        id
        type
        cost
        index
        productInvoiceDetail {
          type
          unitPrice
          quantity
          price
          product {
            id
            type
            productName
            price
            productUnit {
              id
              unitName
            }
          }
        }
        serviceInvoiceDetail {
          type
          unitPrice
          quantity
          price
          service {
            id
            type
            name
            price
            serviceUnit {
              id
              unitName
            }
          }
        }
      }
    }
    cursorId
  }
}
    `;

/**
 * __useGetInvoicesByBusinessQuery__
 *
 * To run a query within a React component, call `useGetInvoicesByBusinessQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetInvoicesByBusinessQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetInvoicesByBusinessQuery({
 *   variables: {
 *      businessId: // value for 'businessId'
 *      cursor: // value for 'cursor'
 *      sets: // value for 'sets'
 *   },
 * });
 */
export function useGetInvoicesByBusinessQuery(baseOptions: Apollo.QueryHookOptions<GetInvoicesByBusinessQuery, GetInvoicesByBusinessQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetInvoicesByBusinessQuery, GetInvoicesByBusinessQueryVariables>(GetInvoicesByBusinessDocument, options);
      }
export function useGetInvoicesByBusinessLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetInvoicesByBusinessQuery, GetInvoicesByBusinessQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetInvoicesByBusinessQuery, GetInvoicesByBusinessQueryVariables>(GetInvoicesByBusinessDocument, options);
        }
export function useGetInvoicesByBusinessSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetInvoicesByBusinessQuery, GetInvoicesByBusinessQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetInvoicesByBusinessQuery, GetInvoicesByBusinessQueryVariables>(GetInvoicesByBusinessDocument, options);
        }
export type GetInvoicesByBusinessQueryHookResult = ReturnType<typeof useGetInvoicesByBusinessQuery>;
export type GetInvoicesByBusinessLazyQueryHookResult = ReturnType<typeof useGetInvoicesByBusinessLazyQuery>;
export type GetInvoicesByBusinessSuspenseQueryHookResult = ReturnType<typeof useGetInvoicesByBusinessSuspenseQuery>;
export type GetInvoicesByBusinessQueryResult = Apollo.QueryResult<GetInvoicesByBusinessQuery, GetInvoicesByBusinessQueryVariables>;
export const GetInvoiceByIdDocument = gql`
    query GetInvoiceById($invoiceId: String!) {
  getInvoiceById(invoiceId: $invoiceId) {
    id
    customer {
      id
      name
      email
      mobile
      address
    }
    subtotal
    totalAmount
    discount
    dueDate
    dateOfIssue
    paidFully
    VAT
    invoiceDetails {
      id
      type
      cost
      index
      productInvoiceDetail {
        type
        unitPrice
        quantity
        price
        product {
          id
          type
          productName
          price
          productUnit {
            id
            unitName
          }
        }
      }
      serviceInvoiceDetail {
        type
        unitPrice
        quantity
        price
        service {
          id
          type
          name
          price
          serviceUnit {
            id
            unitName
          }
        }
      }
    }
  }
}
    `;

/**
 * __useGetInvoiceByIdQuery__
 *
 * To run a query within a React component, call `useGetInvoiceByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetInvoiceByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetInvoiceByIdQuery({
 *   variables: {
 *      invoiceId: // value for 'invoiceId'
 *   },
 * });
 */
export function useGetInvoiceByIdQuery(baseOptions: Apollo.QueryHookOptions<GetInvoiceByIdQuery, GetInvoiceByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetInvoiceByIdQuery, GetInvoiceByIdQueryVariables>(GetInvoiceByIdDocument, options);
      }
export function useGetInvoiceByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetInvoiceByIdQuery, GetInvoiceByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetInvoiceByIdQuery, GetInvoiceByIdQueryVariables>(GetInvoiceByIdDocument, options);
        }
export function useGetInvoiceByIdSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetInvoiceByIdQuery, GetInvoiceByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetInvoiceByIdQuery, GetInvoiceByIdQueryVariables>(GetInvoiceByIdDocument, options);
        }
export type GetInvoiceByIdQueryHookResult = ReturnType<typeof useGetInvoiceByIdQuery>;
export type GetInvoiceByIdLazyQueryHookResult = ReturnType<typeof useGetInvoiceByIdLazyQuery>;
export type GetInvoiceByIdSuspenseQueryHookResult = ReturnType<typeof useGetInvoiceByIdSuspenseQuery>;
export type GetInvoiceByIdQueryResult = Apollo.QueryResult<GetInvoiceByIdQuery, GetInvoiceByIdQueryVariables>;
export const GetMerchantsByBusinessDocument = gql`
    query GetMerchantsByBusiness($businessId: String!) {
  getMerchantsByBusiness(businessId: $businessId) {
    id
    name
    email
    business {
      id
      businessName
    }
    createdAt
  }
}
    `;

/**
 * __useGetMerchantsByBusinessQuery__
 *
 * To run a query within a React component, call `useGetMerchantsByBusinessQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMerchantsByBusinessQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMerchantsByBusinessQuery({
 *   variables: {
 *      businessId: // value for 'businessId'
 *   },
 * });
 */
export function useGetMerchantsByBusinessQuery(baseOptions: Apollo.QueryHookOptions<GetMerchantsByBusinessQuery, GetMerchantsByBusinessQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMerchantsByBusinessQuery, GetMerchantsByBusinessQueryVariables>(GetMerchantsByBusinessDocument, options);
      }
export function useGetMerchantsByBusinessLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMerchantsByBusinessQuery, GetMerchantsByBusinessQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMerchantsByBusinessQuery, GetMerchantsByBusinessQueryVariables>(GetMerchantsByBusinessDocument, options);
        }
export function useGetMerchantsByBusinessSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetMerchantsByBusinessQuery, GetMerchantsByBusinessQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetMerchantsByBusinessQuery, GetMerchantsByBusinessQueryVariables>(GetMerchantsByBusinessDocument, options);
        }
export type GetMerchantsByBusinessQueryHookResult = ReturnType<typeof useGetMerchantsByBusinessQuery>;
export type GetMerchantsByBusinessLazyQueryHookResult = ReturnType<typeof useGetMerchantsByBusinessLazyQuery>;
export type GetMerchantsByBusinessSuspenseQueryHookResult = ReturnType<typeof useGetMerchantsByBusinessSuspenseQuery>;
export type GetMerchantsByBusinessQueryResult = Apollo.QueryResult<GetMerchantsByBusinessQuery, GetMerchantsByBusinessQueryVariables>;
export const NumberOfCustomersThisMonthDocument = gql`
    query NumberOfCustomersThisMonth($businessId: String!, $monthly: Boolean) {
  numberOfCustomersThisMonth(businessId: $businessId, monthly: $monthly) {
    customersThisMonth
    totalCustomers
  }
}
    `;

/**
 * __useNumberOfCustomersThisMonthQuery__
 *
 * To run a query within a React component, call `useNumberOfCustomersThisMonthQuery` and pass it any options that fit your needs.
 * When your component renders, `useNumberOfCustomersThisMonthQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNumberOfCustomersThisMonthQuery({
 *   variables: {
 *      businessId: // value for 'businessId'
 *      monthly: // value for 'monthly'
 *   },
 * });
 */
export function useNumberOfCustomersThisMonthQuery(baseOptions: Apollo.QueryHookOptions<NumberOfCustomersThisMonthQuery, NumberOfCustomersThisMonthQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<NumberOfCustomersThisMonthQuery, NumberOfCustomersThisMonthQueryVariables>(NumberOfCustomersThisMonthDocument, options);
      }
export function useNumberOfCustomersThisMonthLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<NumberOfCustomersThisMonthQuery, NumberOfCustomersThisMonthQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<NumberOfCustomersThisMonthQuery, NumberOfCustomersThisMonthQueryVariables>(NumberOfCustomersThisMonthDocument, options);
        }
export function useNumberOfCustomersThisMonthSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<NumberOfCustomersThisMonthQuery, NumberOfCustomersThisMonthQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<NumberOfCustomersThisMonthQuery, NumberOfCustomersThisMonthQueryVariables>(NumberOfCustomersThisMonthDocument, options);
        }
export type NumberOfCustomersThisMonthQueryHookResult = ReturnType<typeof useNumberOfCustomersThisMonthQuery>;
export type NumberOfCustomersThisMonthLazyQueryHookResult = ReturnType<typeof useNumberOfCustomersThisMonthLazyQuery>;
export type NumberOfCustomersThisMonthSuspenseQueryHookResult = ReturnType<typeof useNumberOfCustomersThisMonthSuspenseQuery>;
export type NumberOfCustomersThisMonthQueryResult = Apollo.QueryResult<NumberOfCustomersThisMonthQuery, NumberOfCustomersThisMonthQueryVariables>;
export const NumberOfCustomersThisQuarterDocument = gql`
    query NumberOfCustomersThisQuarter($businessId: String!, $quarterly: Boolean) {
  numberOfCustomersThisQuarter(businessId: $businessId, quarterly: $quarterly) {
    customersThisQuarter
    totalCustomers
  }
}
    `;

/**
 * __useNumberOfCustomersThisQuarterQuery__
 *
 * To run a query within a React component, call `useNumberOfCustomersThisQuarterQuery` and pass it any options that fit your needs.
 * When your component renders, `useNumberOfCustomersThisQuarterQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNumberOfCustomersThisQuarterQuery({
 *   variables: {
 *      businessId: // value for 'businessId'
 *      quarterly: // value for 'quarterly'
 *   },
 * });
 */
export function useNumberOfCustomersThisQuarterQuery(baseOptions: Apollo.QueryHookOptions<NumberOfCustomersThisQuarterQuery, NumberOfCustomersThisQuarterQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<NumberOfCustomersThisQuarterQuery, NumberOfCustomersThisQuarterQueryVariables>(NumberOfCustomersThisQuarterDocument, options);
      }
export function useNumberOfCustomersThisQuarterLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<NumberOfCustomersThisQuarterQuery, NumberOfCustomersThisQuarterQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<NumberOfCustomersThisQuarterQuery, NumberOfCustomersThisQuarterQueryVariables>(NumberOfCustomersThisQuarterDocument, options);
        }
export function useNumberOfCustomersThisQuarterSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<NumberOfCustomersThisQuarterQuery, NumberOfCustomersThisQuarterQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<NumberOfCustomersThisQuarterQuery, NumberOfCustomersThisQuarterQueryVariables>(NumberOfCustomersThisQuarterDocument, options);
        }
export type NumberOfCustomersThisQuarterQueryHookResult = ReturnType<typeof useNumberOfCustomersThisQuarterQuery>;
export type NumberOfCustomersThisQuarterLazyQueryHookResult = ReturnType<typeof useNumberOfCustomersThisQuarterLazyQuery>;
export type NumberOfCustomersThisQuarterSuspenseQueryHookResult = ReturnType<typeof useNumberOfCustomersThisQuarterSuspenseQuery>;
export type NumberOfCustomersThisQuarterQueryResult = Apollo.QueryResult<NumberOfCustomersThisQuarterQuery, NumberOfCustomersThisQuarterQueryVariables>;
export const NumberOfCustomersThisWeekDocument = gql`
    query NumberOfCustomersThisWeek($businessId: String!, $weekly: Boolean) {
  numberOfCustomersThisWeek(businessId: $businessId, weekly: $weekly) {
    customersThisWeek
    totalCustomers
  }
}
    `;

/**
 * __useNumberOfCustomersThisWeekQuery__
 *
 * To run a query within a React component, call `useNumberOfCustomersThisWeekQuery` and pass it any options that fit your needs.
 * When your component renders, `useNumberOfCustomersThisWeekQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNumberOfCustomersThisWeekQuery({
 *   variables: {
 *      businessId: // value for 'businessId'
 *      weekly: // value for 'weekly'
 *   },
 * });
 */
export function useNumberOfCustomersThisWeekQuery(baseOptions: Apollo.QueryHookOptions<NumberOfCustomersThisWeekQuery, NumberOfCustomersThisWeekQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<NumberOfCustomersThisWeekQuery, NumberOfCustomersThisWeekQueryVariables>(NumberOfCustomersThisWeekDocument, options);
      }
export function useNumberOfCustomersThisWeekLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<NumberOfCustomersThisWeekQuery, NumberOfCustomersThisWeekQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<NumberOfCustomersThisWeekQuery, NumberOfCustomersThisWeekQueryVariables>(NumberOfCustomersThisWeekDocument, options);
        }
export function useNumberOfCustomersThisWeekSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<NumberOfCustomersThisWeekQuery, NumberOfCustomersThisWeekQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<NumberOfCustomersThisWeekQuery, NumberOfCustomersThisWeekQueryVariables>(NumberOfCustomersThisWeekDocument, options);
        }
export type NumberOfCustomersThisWeekQueryHookResult = ReturnType<typeof useNumberOfCustomersThisWeekQuery>;
export type NumberOfCustomersThisWeekLazyQueryHookResult = ReturnType<typeof useNumberOfCustomersThisWeekLazyQuery>;
export type NumberOfCustomersThisWeekSuspenseQueryHookResult = ReturnType<typeof useNumberOfCustomersThisWeekSuspenseQuery>;
export type NumberOfCustomersThisWeekQueryResult = Apollo.QueryResult<NumberOfCustomersThisWeekQuery, NumberOfCustomersThisWeekQueryVariables>;
export const NumberOfCustomersThisYearDocument = gql`
    query NumberOfCustomersThisYear($businessId: String!, $yearly: Boolean) {
  numberOfCustomersThisYear(businessId: $businessId, yearly: $yearly) {
    customersThisYear
    totalCustomers
  }
}
    `;

/**
 * __useNumberOfCustomersThisYearQuery__
 *
 * To run a query within a React component, call `useNumberOfCustomersThisYearQuery` and pass it any options that fit your needs.
 * When your component renders, `useNumberOfCustomersThisYearQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNumberOfCustomersThisYearQuery({
 *   variables: {
 *      businessId: // value for 'businessId'
 *      yearly: // value for 'yearly'
 *   },
 * });
 */
export function useNumberOfCustomersThisYearQuery(baseOptions: Apollo.QueryHookOptions<NumberOfCustomersThisYearQuery, NumberOfCustomersThisYearQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<NumberOfCustomersThisYearQuery, NumberOfCustomersThisYearQueryVariables>(NumberOfCustomersThisYearDocument, options);
      }
export function useNumberOfCustomersThisYearLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<NumberOfCustomersThisYearQuery, NumberOfCustomersThisYearQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<NumberOfCustomersThisYearQuery, NumberOfCustomersThisYearQueryVariables>(NumberOfCustomersThisYearDocument, options);
        }
export function useNumberOfCustomersThisYearSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<NumberOfCustomersThisYearQuery, NumberOfCustomersThisYearQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<NumberOfCustomersThisYearQuery, NumberOfCustomersThisYearQueryVariables>(NumberOfCustomersThisYearDocument, options);
        }
export type NumberOfCustomersThisYearQueryHookResult = ReturnType<typeof useNumberOfCustomersThisYearQuery>;
export type NumberOfCustomersThisYearLazyQueryHookResult = ReturnType<typeof useNumberOfCustomersThisYearLazyQuery>;
export type NumberOfCustomersThisYearSuspenseQueryHookResult = ReturnType<typeof useNumberOfCustomersThisYearSuspenseQuery>;
export type NumberOfCustomersThisYearQueryResult = Apollo.QueryResult<NumberOfCustomersThisYearQuery, NumberOfCustomersThisYearQueryVariables>;
export const NumberOfInvoicesThisMonthDocument = gql`
    query NumberOfInvoicesThisMonth($businessId: String!, $monthly: Boolean) {
  numberOfInvoicesThisMonth(businessId: $businessId, monthly: $monthly) {
    invoicesThisMonth
    totalInvoices
  }
}
    `;

/**
 * __useNumberOfInvoicesThisMonthQuery__
 *
 * To run a query within a React component, call `useNumberOfInvoicesThisMonthQuery` and pass it any options that fit your needs.
 * When your component renders, `useNumberOfInvoicesThisMonthQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNumberOfInvoicesThisMonthQuery({
 *   variables: {
 *      businessId: // value for 'businessId'
 *      monthly: // value for 'monthly'
 *   },
 * });
 */
export function useNumberOfInvoicesThisMonthQuery(baseOptions: Apollo.QueryHookOptions<NumberOfInvoicesThisMonthQuery, NumberOfInvoicesThisMonthQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<NumberOfInvoicesThisMonthQuery, NumberOfInvoicesThisMonthQueryVariables>(NumberOfInvoicesThisMonthDocument, options);
      }
export function useNumberOfInvoicesThisMonthLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<NumberOfInvoicesThisMonthQuery, NumberOfInvoicesThisMonthQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<NumberOfInvoicesThisMonthQuery, NumberOfInvoicesThisMonthQueryVariables>(NumberOfInvoicesThisMonthDocument, options);
        }
export function useNumberOfInvoicesThisMonthSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<NumberOfInvoicesThisMonthQuery, NumberOfInvoicesThisMonthQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<NumberOfInvoicesThisMonthQuery, NumberOfInvoicesThisMonthQueryVariables>(NumberOfInvoicesThisMonthDocument, options);
        }
export type NumberOfInvoicesThisMonthQueryHookResult = ReturnType<typeof useNumberOfInvoicesThisMonthQuery>;
export type NumberOfInvoicesThisMonthLazyQueryHookResult = ReturnType<typeof useNumberOfInvoicesThisMonthLazyQuery>;
export type NumberOfInvoicesThisMonthSuspenseQueryHookResult = ReturnType<typeof useNumberOfInvoicesThisMonthSuspenseQuery>;
export type NumberOfInvoicesThisMonthQueryResult = Apollo.QueryResult<NumberOfInvoicesThisMonthQuery, NumberOfInvoicesThisMonthQueryVariables>;
export const NumberOfInvoicesThisQuarterDocument = gql`
    query NumberOfInvoicesThisQuarter($businessId: String!, $quarterly: Boolean) {
  numberOfInvoicesThisQuarter(businessId: $businessId, quarterly: $quarterly) {
    invoicesThisQuarter
    totalInvoices
  }
}
    `;

/**
 * __useNumberOfInvoicesThisQuarterQuery__
 *
 * To run a query within a React component, call `useNumberOfInvoicesThisQuarterQuery` and pass it any options that fit your needs.
 * When your component renders, `useNumberOfInvoicesThisQuarterQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNumberOfInvoicesThisQuarterQuery({
 *   variables: {
 *      businessId: // value for 'businessId'
 *      quarterly: // value for 'quarterly'
 *   },
 * });
 */
export function useNumberOfInvoicesThisQuarterQuery(baseOptions: Apollo.QueryHookOptions<NumberOfInvoicesThisQuarterQuery, NumberOfInvoicesThisQuarterQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<NumberOfInvoicesThisQuarterQuery, NumberOfInvoicesThisQuarterQueryVariables>(NumberOfInvoicesThisQuarterDocument, options);
      }
export function useNumberOfInvoicesThisQuarterLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<NumberOfInvoicesThisQuarterQuery, NumberOfInvoicesThisQuarterQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<NumberOfInvoicesThisQuarterQuery, NumberOfInvoicesThisQuarterQueryVariables>(NumberOfInvoicesThisQuarterDocument, options);
        }
export function useNumberOfInvoicesThisQuarterSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<NumberOfInvoicesThisQuarterQuery, NumberOfInvoicesThisQuarterQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<NumberOfInvoicesThisQuarterQuery, NumberOfInvoicesThisQuarterQueryVariables>(NumberOfInvoicesThisQuarterDocument, options);
        }
export type NumberOfInvoicesThisQuarterQueryHookResult = ReturnType<typeof useNumberOfInvoicesThisQuarterQuery>;
export type NumberOfInvoicesThisQuarterLazyQueryHookResult = ReturnType<typeof useNumberOfInvoicesThisQuarterLazyQuery>;
export type NumberOfInvoicesThisQuarterSuspenseQueryHookResult = ReturnType<typeof useNumberOfInvoicesThisQuarterSuspenseQuery>;
export type NumberOfInvoicesThisQuarterQueryResult = Apollo.QueryResult<NumberOfInvoicesThisQuarterQuery, NumberOfInvoicesThisQuarterQueryVariables>;
export const NumberOfInvoicesThisWeekDocument = gql`
    query NumberOfInvoicesThisWeek($businessId: String!, $weekly: Boolean) {
  numberOfInvoicesThisWeek(businessId: $businessId, weekly: $weekly) {
    invoicesThisweek
    totalInvoices
  }
}
    `;

/**
 * __useNumberOfInvoicesThisWeekQuery__
 *
 * To run a query within a React component, call `useNumberOfInvoicesThisWeekQuery` and pass it any options that fit your needs.
 * When your component renders, `useNumberOfInvoicesThisWeekQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNumberOfInvoicesThisWeekQuery({
 *   variables: {
 *      businessId: // value for 'businessId'
 *      weekly: // value for 'weekly'
 *   },
 * });
 */
export function useNumberOfInvoicesThisWeekQuery(baseOptions: Apollo.QueryHookOptions<NumberOfInvoicesThisWeekQuery, NumberOfInvoicesThisWeekQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<NumberOfInvoicesThisWeekQuery, NumberOfInvoicesThisWeekQueryVariables>(NumberOfInvoicesThisWeekDocument, options);
      }
export function useNumberOfInvoicesThisWeekLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<NumberOfInvoicesThisWeekQuery, NumberOfInvoicesThisWeekQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<NumberOfInvoicesThisWeekQuery, NumberOfInvoicesThisWeekQueryVariables>(NumberOfInvoicesThisWeekDocument, options);
        }
export function useNumberOfInvoicesThisWeekSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<NumberOfInvoicesThisWeekQuery, NumberOfInvoicesThisWeekQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<NumberOfInvoicesThisWeekQuery, NumberOfInvoicesThisWeekQueryVariables>(NumberOfInvoicesThisWeekDocument, options);
        }
export type NumberOfInvoicesThisWeekQueryHookResult = ReturnType<typeof useNumberOfInvoicesThisWeekQuery>;
export type NumberOfInvoicesThisWeekLazyQueryHookResult = ReturnType<typeof useNumberOfInvoicesThisWeekLazyQuery>;
export type NumberOfInvoicesThisWeekSuspenseQueryHookResult = ReturnType<typeof useNumberOfInvoicesThisWeekSuspenseQuery>;
export type NumberOfInvoicesThisWeekQueryResult = Apollo.QueryResult<NumberOfInvoicesThisWeekQuery, NumberOfInvoicesThisWeekQueryVariables>;
export const NumberOfInvoicesThisYearDocument = gql`
    query NumberOfInvoicesThisYear($businessId: String!, $yearly: Boolean) {
  numberOfInvoicesThisYear(businessId: $businessId, yearly: $yearly) {
    invoicesThisYear
    totalInvoices
  }
}
    `;

/**
 * __useNumberOfInvoicesThisYearQuery__
 *
 * To run a query within a React component, call `useNumberOfInvoicesThisYearQuery` and pass it any options that fit your needs.
 * When your component renders, `useNumberOfInvoicesThisYearQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNumberOfInvoicesThisYearQuery({
 *   variables: {
 *      businessId: // value for 'businessId'
 *      yearly: // value for 'yearly'
 *   },
 * });
 */
export function useNumberOfInvoicesThisYearQuery(baseOptions: Apollo.QueryHookOptions<NumberOfInvoicesThisYearQuery, NumberOfInvoicesThisYearQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<NumberOfInvoicesThisYearQuery, NumberOfInvoicesThisYearQueryVariables>(NumberOfInvoicesThisYearDocument, options);
      }
export function useNumberOfInvoicesThisYearLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<NumberOfInvoicesThisYearQuery, NumberOfInvoicesThisYearQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<NumberOfInvoicesThisYearQuery, NumberOfInvoicesThisYearQueryVariables>(NumberOfInvoicesThisYearDocument, options);
        }
export function useNumberOfInvoicesThisYearSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<NumberOfInvoicesThisYearQuery, NumberOfInvoicesThisYearQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<NumberOfInvoicesThisYearQuery, NumberOfInvoicesThisYearQueryVariables>(NumberOfInvoicesThisYearDocument, options);
        }
export type NumberOfInvoicesThisYearQueryHookResult = ReturnType<typeof useNumberOfInvoicesThisYearQuery>;
export type NumberOfInvoicesThisYearLazyQueryHookResult = ReturnType<typeof useNumberOfInvoicesThisYearLazyQuery>;
export type NumberOfInvoicesThisYearSuspenseQueryHookResult = ReturnType<typeof useNumberOfInvoicesThisYearSuspenseQuery>;
export type NumberOfInvoicesThisYearQueryResult = Apollo.QueryResult<NumberOfInvoicesThisYearQuery, NumberOfInvoicesThisYearQueryVariables>;
export const GetPlansDocument = gql`
    query GetPlans {
  getPlans {
    id
    planName
    currentPrice
    isActive
    optionIncluded {
      option {
        id
        optionName
      }
    }
  }
}
    `;

/**
 * __useGetPlansQuery__
 *
 * To run a query within a React component, call `useGetPlansQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPlansQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPlansQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetPlansQuery(baseOptions?: Apollo.QueryHookOptions<GetPlansQuery, GetPlansQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPlansQuery, GetPlansQueryVariables>(GetPlansDocument, options);
      }
export function useGetPlansLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPlansQuery, GetPlansQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPlansQuery, GetPlansQueryVariables>(GetPlansDocument, options);
        }
export function useGetPlansSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetPlansQuery, GetPlansQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetPlansQuery, GetPlansQueryVariables>(GetPlansDocument, options);
        }
export type GetPlansQueryHookResult = ReturnType<typeof useGetPlansQuery>;
export type GetPlansLazyQueryHookResult = ReturnType<typeof useGetPlansLazyQuery>;
export type GetPlansSuspenseQueryHookResult = ReturnType<typeof useGetPlansSuspenseQuery>;
export type GetPlansQueryResult = Apollo.QueryResult<GetPlansQuery, GetPlansQueryVariables>;
export const GetProductByIdDocument = gql`
    query GetProductById($productId: String!) {
  getProductById(productId: $productId) {
    productName
    price
    productUnit {
      unitName
    }
    productUnitId
    reorderLevel
    trackReorderLevel
  }
}
    `;

/**
 * __useGetProductByIdQuery__
 *
 * To run a query within a React component, call `useGetProductByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProductByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProductByIdQuery({
 *   variables: {
 *      productId: // value for 'productId'
 *   },
 * });
 */
export function useGetProductByIdQuery(baseOptions: Apollo.QueryHookOptions<GetProductByIdQuery, GetProductByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProductByIdQuery, GetProductByIdQueryVariables>(GetProductByIdDocument, options);
      }
export function useGetProductByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProductByIdQuery, GetProductByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProductByIdQuery, GetProductByIdQueryVariables>(GetProductByIdDocument, options);
        }
export function useGetProductByIdSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetProductByIdQuery, GetProductByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetProductByIdQuery, GetProductByIdQueryVariables>(GetProductByIdDocument, options);
        }
export type GetProductByIdQueryHookResult = ReturnType<typeof useGetProductByIdQuery>;
export type GetProductByIdLazyQueryHookResult = ReturnType<typeof useGetProductByIdLazyQuery>;
export type GetProductByIdSuspenseQueryHookResult = ReturnType<typeof useGetProductByIdSuspenseQuery>;
export type GetProductByIdQueryResult = Apollo.QueryResult<GetProductByIdQuery, GetProductByIdQueryVariables>;
export const GetProductOrServiceByBusinessDocument = gql`
    query GetProductOrServiceByBusiness($businessId: String!, $take: Float, $cursor: String, $type: String) {
  getProductOrServiceByBusiness(
    businessId: $businessId
    cursor: $cursor
    take: $take
    type: $type
  ) {
    productOrServiceByBusiness {
      id
      title
      type
      price
      isArchived
      product {
        productName
        price
        id
        type
        productUnit {
          id
          unitName
        }
      }
      service {
        name
        price
        serviceUnit {
          id
          unitName
        }
      }
      business {
        businessName
      }
      createdAt
    }
    cursorId
    type
  }
}
    `;

/**
 * __useGetProductOrServiceByBusinessQuery__
 *
 * To run a query within a React component, call `useGetProductOrServiceByBusinessQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProductOrServiceByBusinessQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProductOrServiceByBusinessQuery({
 *   variables: {
 *      businessId: // value for 'businessId'
 *      take: // value for 'take'
 *      cursor: // value for 'cursor'
 *      type: // value for 'type'
 *   },
 * });
 */
export function useGetProductOrServiceByBusinessQuery(baseOptions: Apollo.QueryHookOptions<GetProductOrServiceByBusinessQuery, GetProductOrServiceByBusinessQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProductOrServiceByBusinessQuery, GetProductOrServiceByBusinessQueryVariables>(GetProductOrServiceByBusinessDocument, options);
      }
export function useGetProductOrServiceByBusinessLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProductOrServiceByBusinessQuery, GetProductOrServiceByBusinessQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProductOrServiceByBusinessQuery, GetProductOrServiceByBusinessQueryVariables>(GetProductOrServiceByBusinessDocument, options);
        }
export function useGetProductOrServiceByBusinessSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetProductOrServiceByBusinessQuery, GetProductOrServiceByBusinessQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetProductOrServiceByBusinessQuery, GetProductOrServiceByBusinessQueryVariables>(GetProductOrServiceByBusinessDocument, options);
        }
export type GetProductOrServiceByBusinessQueryHookResult = ReturnType<typeof useGetProductOrServiceByBusinessQuery>;
export type GetProductOrServiceByBusinessLazyQueryHookResult = ReturnType<typeof useGetProductOrServiceByBusinessLazyQuery>;
export type GetProductOrServiceByBusinessSuspenseQueryHookResult = ReturnType<typeof useGetProductOrServiceByBusinessSuspenseQuery>;
export type GetProductOrServiceByBusinessQueryResult = Apollo.QueryResult<GetProductOrServiceByBusinessQuery, GetProductOrServiceByBusinessQueryVariables>;
export const GetProductUnitsDocument = gql`
    query GetProductUnits {
  getProductUnits {
    id
    unitName
    createdAt
  }
}
    `;

/**
 * __useGetProductUnitsQuery__
 *
 * To run a query within a React component, call `useGetProductUnitsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProductUnitsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProductUnitsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetProductUnitsQuery(baseOptions?: Apollo.QueryHookOptions<GetProductUnitsQuery, GetProductUnitsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProductUnitsQuery, GetProductUnitsQueryVariables>(GetProductUnitsDocument, options);
      }
export function useGetProductUnitsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProductUnitsQuery, GetProductUnitsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProductUnitsQuery, GetProductUnitsQueryVariables>(GetProductUnitsDocument, options);
        }
export function useGetProductUnitsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetProductUnitsQuery, GetProductUnitsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetProductUnitsQuery, GetProductUnitsQueryVariables>(GetProductUnitsDocument, options);
        }
export type GetProductUnitsQueryHookResult = ReturnType<typeof useGetProductUnitsQuery>;
export type GetProductUnitsLazyQueryHookResult = ReturnType<typeof useGetProductUnitsLazyQuery>;
export type GetProductUnitsSuspenseQueryHookResult = ReturnType<typeof useGetProductUnitsSuspenseQuery>;
export type GetProductUnitsQueryResult = Apollo.QueryResult<GetProductUnitsQuery, GetProductUnitsQueryVariables>;
export const GetProductsByBusinessDocument = gql`
    query GetProductsByBusiness($businessId: String!, $cursor: String, $sets: Float) {
  getProductsByBusiness(businessId: $businessId, cursor: $cursor, sets: $sets) {
    productByBusiness {
      id
      type
      productName
      price
      productUnit {
        unitName
      }
      stockStatus
      productUnitId
      isArchived
      businessId
      createdAt
    }
    cursorId
  }
}
    `;

/**
 * __useGetProductsByBusinessQuery__
 *
 * To run a query within a React component, call `useGetProductsByBusinessQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProductsByBusinessQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProductsByBusinessQuery({
 *   variables: {
 *      businessId: // value for 'businessId'
 *      cursor: // value for 'cursor'
 *      sets: // value for 'sets'
 *   },
 * });
 */
export function useGetProductsByBusinessQuery(baseOptions: Apollo.QueryHookOptions<GetProductsByBusinessQuery, GetProductsByBusinessQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProductsByBusinessQuery, GetProductsByBusinessQueryVariables>(GetProductsByBusinessDocument, options);
      }
export function useGetProductsByBusinessLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProductsByBusinessQuery, GetProductsByBusinessQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProductsByBusinessQuery, GetProductsByBusinessQueryVariables>(GetProductsByBusinessDocument, options);
        }
export function useGetProductsByBusinessSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetProductsByBusinessQuery, GetProductsByBusinessQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetProductsByBusinessQuery, GetProductsByBusinessQueryVariables>(GetProductsByBusinessDocument, options);
        }
export type GetProductsByBusinessQueryHookResult = ReturnType<typeof useGetProductsByBusinessQuery>;
export type GetProductsByBusinessLazyQueryHookResult = ReturnType<typeof useGetProductsByBusinessLazyQuery>;
export type GetProductsByBusinessSuspenseQueryHookResult = ReturnType<typeof useGetProductsByBusinessSuspenseQuery>;
export type GetProductsByBusinessQueryResult = Apollo.QueryResult<GetProductsByBusinessQuery, GetProductsByBusinessQueryVariables>;
export const GetProductForWeekDocument = gql`
    query GetProductForWeek($businessId: String!, $weekly: Boolean) {
  getProductsForWeek(businessId: $businessId, weekly: $weekly) {
    productsThisWeek
    totalProductAmountThisWeek
    productsInStock
    productsOutOfStock
  }
}
    `;

/**
 * __useGetProductForWeekQuery__
 *
 * To run a query within a React component, call `useGetProductForWeekQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProductForWeekQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProductForWeekQuery({
 *   variables: {
 *      businessId: // value for 'businessId'
 *      weekly: // value for 'weekly'
 *   },
 * });
 */
export function useGetProductForWeekQuery(baseOptions: Apollo.QueryHookOptions<GetProductForWeekQuery, GetProductForWeekQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProductForWeekQuery, GetProductForWeekQueryVariables>(GetProductForWeekDocument, options);
      }
export function useGetProductForWeekLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProductForWeekQuery, GetProductForWeekQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProductForWeekQuery, GetProductForWeekQueryVariables>(GetProductForWeekDocument, options);
        }
export function useGetProductForWeekSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetProductForWeekQuery, GetProductForWeekQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetProductForWeekQuery, GetProductForWeekQueryVariables>(GetProductForWeekDocument, options);
        }
export type GetProductForWeekQueryHookResult = ReturnType<typeof useGetProductForWeekQuery>;
export type GetProductForWeekLazyQueryHookResult = ReturnType<typeof useGetProductForWeekLazyQuery>;
export type GetProductForWeekSuspenseQueryHookResult = ReturnType<typeof useGetProductForWeekSuspenseQuery>;
export type GetProductForWeekQueryResult = Apollo.QueryResult<GetProductForWeekQuery, GetProductForWeekQueryVariables>;
export const GetPurchaseByBusinessMobileDocument = gql`
    query GetPurchaseByBusinessMobile($businessId: String!, $cursor: String, $take: Float) {
  getPurchaseByBusinessMobile(
    businessId: $businessId
    cursor: $cursor
    take: $take
  ) {
    purchaseByBusiness {
      id
      description
      transactionDate
      total
      businessId
      purchaseItems {
        description
        quantity
        unitPrice
        price
        product {
          productName
          price
        }
      }
    }
    cursorId
  }
}
    `;

/**
 * __useGetPurchaseByBusinessMobileQuery__
 *
 * To run a query within a React component, call `useGetPurchaseByBusinessMobileQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPurchaseByBusinessMobileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPurchaseByBusinessMobileQuery({
 *   variables: {
 *      businessId: // value for 'businessId'
 *      cursor: // value for 'cursor'
 *      take: // value for 'take'
 *   },
 * });
 */
export function useGetPurchaseByBusinessMobileQuery(baseOptions: Apollo.QueryHookOptions<GetPurchaseByBusinessMobileQuery, GetPurchaseByBusinessMobileQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPurchaseByBusinessMobileQuery, GetPurchaseByBusinessMobileQueryVariables>(GetPurchaseByBusinessMobileDocument, options);
      }
export function useGetPurchaseByBusinessMobileLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPurchaseByBusinessMobileQuery, GetPurchaseByBusinessMobileQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPurchaseByBusinessMobileQuery, GetPurchaseByBusinessMobileQueryVariables>(GetPurchaseByBusinessMobileDocument, options);
        }
export function useGetPurchaseByBusinessMobileSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetPurchaseByBusinessMobileQuery, GetPurchaseByBusinessMobileQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetPurchaseByBusinessMobileQuery, GetPurchaseByBusinessMobileQueryVariables>(GetPurchaseByBusinessMobileDocument, options);
        }
export type GetPurchaseByBusinessMobileQueryHookResult = ReturnType<typeof useGetPurchaseByBusinessMobileQuery>;
export type GetPurchaseByBusinessMobileLazyQueryHookResult = ReturnType<typeof useGetPurchaseByBusinessMobileLazyQuery>;
export type GetPurchaseByBusinessMobileSuspenseQueryHookResult = ReturnType<typeof useGetPurchaseByBusinessMobileSuspenseQuery>;
export type GetPurchaseByBusinessMobileQueryResult = Apollo.QueryResult<GetPurchaseByBusinessMobileQuery, GetPurchaseByBusinessMobileQueryVariables>;
export const GetPurchasesDocument = gql`
    query GetPurchases {
  getPurchases {
    id
    description
    transactionDate
    total
    businessId
    purchaseItems {
      description
      quantity
      unitPrice
      price
      product {
        productName
        price
      }
    }
  }
}
    `;

/**
 * __useGetPurchasesQuery__
 *
 * To run a query within a React component, call `useGetPurchasesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPurchasesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPurchasesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetPurchasesQuery(baseOptions?: Apollo.QueryHookOptions<GetPurchasesQuery, GetPurchasesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPurchasesQuery, GetPurchasesQueryVariables>(GetPurchasesDocument, options);
      }
export function useGetPurchasesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPurchasesQuery, GetPurchasesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPurchasesQuery, GetPurchasesQueryVariables>(GetPurchasesDocument, options);
        }
export function useGetPurchasesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetPurchasesQuery, GetPurchasesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetPurchasesQuery, GetPurchasesQueryVariables>(GetPurchasesDocument, options);
        }
export type GetPurchasesQueryHookResult = ReturnType<typeof useGetPurchasesQuery>;
export type GetPurchasesLazyQueryHookResult = ReturnType<typeof useGetPurchasesLazyQuery>;
export type GetPurchasesSuspenseQueryHookResult = ReturnType<typeof useGetPurchasesSuspenseQuery>;
export type GetPurchasesQueryResult = Apollo.QueryResult<GetPurchasesQuery, GetPurchasesQueryVariables>;
export const GetPurchaseByBusinessDocument = gql`
    query GetPurchaseByBusiness($businessId: String!, $cursor: String, $sets: Float) {
  getPurchaseByBusiness(businessId: $businessId, cursor: $cursor, sets: $sets) {
    purchaseByBusiness {
      id
      description
      transactionDate
      total
      businessId
      merchant {
        name
      }
      paid
      business {
        businessName
      }
      purchasePayments {
        total
        file
        transactionDate
        description
      }
      purchaseItems {
        description
        quantity
        unitPrice
        price
        product {
          productName
          price
        }
      }
    }
    cursorId
  }
}
    `;

/**
 * __useGetPurchaseByBusinessQuery__
 *
 * To run a query within a React component, call `useGetPurchaseByBusinessQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPurchaseByBusinessQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPurchaseByBusinessQuery({
 *   variables: {
 *      businessId: // value for 'businessId'
 *      cursor: // value for 'cursor'
 *      sets: // value for 'sets'
 *   },
 * });
 */
export function useGetPurchaseByBusinessQuery(baseOptions: Apollo.QueryHookOptions<GetPurchaseByBusinessQuery, GetPurchaseByBusinessQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPurchaseByBusinessQuery, GetPurchaseByBusinessQueryVariables>(GetPurchaseByBusinessDocument, options);
      }
export function useGetPurchaseByBusinessLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPurchaseByBusinessQuery, GetPurchaseByBusinessQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPurchaseByBusinessQuery, GetPurchaseByBusinessQueryVariables>(GetPurchaseByBusinessDocument, options);
        }
export function useGetPurchaseByBusinessSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetPurchaseByBusinessQuery, GetPurchaseByBusinessQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetPurchaseByBusinessQuery, GetPurchaseByBusinessQueryVariables>(GetPurchaseByBusinessDocument, options);
        }
export type GetPurchaseByBusinessQueryHookResult = ReturnType<typeof useGetPurchaseByBusinessQuery>;
export type GetPurchaseByBusinessLazyQueryHookResult = ReturnType<typeof useGetPurchaseByBusinessLazyQuery>;
export type GetPurchaseByBusinessSuspenseQueryHookResult = ReturnType<typeof useGetPurchaseByBusinessSuspenseQuery>;
export type GetPurchaseByBusinessQueryResult = Apollo.QueryResult<GetPurchaseByBusinessQuery, GetPurchaseByBusinessQueryVariables>;
export const GetPurchaseByIdDocument = gql`
    query GetPurchaseById($purchaseId: String!) {
  getPurchaseById(purchaseId: $purchaseId) {
    id
    description
    reference
    transactionDate
    deliveryDate
    total
    paid
    createdAt
    purchaseStatusId
    merchant {
      name
      email
      id
    }
    businessId
    purchaseItems {
      id
      quantityReceived
      archived
      received
      productId
      description
      quantity
      unitPrice
      purchase {
        createdAt
        updatedAt
      }
      index
      price
      product {
        productName
        price
        id
        productUnit {
          unitName
        }
      }
    }
    purchaseStatusId
    purchaseStatus {
      id
      purchaseStatus
    }
    purchaseLines {
      id
      lineAmount
      lineQuantity
      transactionDate
    }
  }
}
    `;

/**
 * __useGetPurchaseByIdQuery__
 *
 * To run a query within a React component, call `useGetPurchaseByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPurchaseByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPurchaseByIdQuery({
 *   variables: {
 *      purchaseId: // value for 'purchaseId'
 *   },
 * });
 */
export function useGetPurchaseByIdQuery(baseOptions: Apollo.QueryHookOptions<GetPurchaseByIdQuery, GetPurchaseByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPurchaseByIdQuery, GetPurchaseByIdQueryVariables>(GetPurchaseByIdDocument, options);
      }
export function useGetPurchaseByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPurchaseByIdQuery, GetPurchaseByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPurchaseByIdQuery, GetPurchaseByIdQueryVariables>(GetPurchaseByIdDocument, options);
        }
export function useGetPurchaseByIdSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetPurchaseByIdQuery, GetPurchaseByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetPurchaseByIdQuery, GetPurchaseByIdQueryVariables>(GetPurchaseByIdDocument, options);
        }
export type GetPurchaseByIdQueryHookResult = ReturnType<typeof useGetPurchaseByIdQuery>;
export type GetPurchaseByIdLazyQueryHookResult = ReturnType<typeof useGetPurchaseByIdLazyQuery>;
export type GetPurchaseByIdSuspenseQueryHookResult = ReturnType<typeof useGetPurchaseByIdSuspenseQuery>;
export type GetPurchaseByIdQueryResult = Apollo.QueryResult<GetPurchaseByIdQuery, GetPurchaseByIdQueryVariables>;
export const GetPurchaseForMonthDocument = gql`
    query GetPurchaseForMonth($businessId: String!, $monthly: Boolean) {
  getPurchaseForMonth(businessId: $businessId, monthly: $monthly) {
    purchasesThisMonth
    totalPurchaseAmountThisMonth
    pendingPurchasesThisMonth
    totalPendingPurchaseAmountThisMonth
    paidPurchasesThisMonth
    totalPaidPurchaseAmountThisMonth
  }
}
    `;

/**
 * __useGetPurchaseForMonthQuery__
 *
 * To run a query within a React component, call `useGetPurchaseForMonthQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPurchaseForMonthQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPurchaseForMonthQuery({
 *   variables: {
 *      businessId: // value for 'businessId'
 *      monthly: // value for 'monthly'
 *   },
 * });
 */
export function useGetPurchaseForMonthQuery(baseOptions: Apollo.QueryHookOptions<GetPurchaseForMonthQuery, GetPurchaseForMonthQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPurchaseForMonthQuery, GetPurchaseForMonthQueryVariables>(GetPurchaseForMonthDocument, options);
      }
export function useGetPurchaseForMonthLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPurchaseForMonthQuery, GetPurchaseForMonthQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPurchaseForMonthQuery, GetPurchaseForMonthQueryVariables>(GetPurchaseForMonthDocument, options);
        }
export function useGetPurchaseForMonthSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetPurchaseForMonthQuery, GetPurchaseForMonthQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetPurchaseForMonthQuery, GetPurchaseForMonthQueryVariables>(GetPurchaseForMonthDocument, options);
        }
export type GetPurchaseForMonthQueryHookResult = ReturnType<typeof useGetPurchaseForMonthQuery>;
export type GetPurchaseForMonthLazyQueryHookResult = ReturnType<typeof useGetPurchaseForMonthLazyQuery>;
export type GetPurchaseForMonthSuspenseQueryHookResult = ReturnType<typeof useGetPurchaseForMonthSuspenseQuery>;
export type GetPurchaseForMonthQueryResult = Apollo.QueryResult<GetPurchaseForMonthQuery, GetPurchaseForMonthQueryVariables>;
export const GetPurchaseForQuarterDocument = gql`
    query GetPurchaseForQuarter($businessId: String!, $quarterly: Boolean) {
  getPurchaseForQuarter(businessId: $businessId, quarterly: $quarterly) {
    purchasesThisQuarter
    totalPurchaseAmountThisQuarter
    pendingpurchasesThisQuarter
    totalPendingPurchaseAmountThisQuarter
    paidPurchasesThisQuarter
    totalPaidPurchaseAmountThisQuarter
  }
}
    `;

/**
 * __useGetPurchaseForQuarterQuery__
 *
 * To run a query within a React component, call `useGetPurchaseForQuarterQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPurchaseForQuarterQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPurchaseForQuarterQuery({
 *   variables: {
 *      businessId: // value for 'businessId'
 *      quarterly: // value for 'quarterly'
 *   },
 * });
 */
export function useGetPurchaseForQuarterQuery(baseOptions: Apollo.QueryHookOptions<GetPurchaseForQuarterQuery, GetPurchaseForQuarterQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPurchaseForQuarterQuery, GetPurchaseForQuarterQueryVariables>(GetPurchaseForQuarterDocument, options);
      }
export function useGetPurchaseForQuarterLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPurchaseForQuarterQuery, GetPurchaseForQuarterQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPurchaseForQuarterQuery, GetPurchaseForQuarterQueryVariables>(GetPurchaseForQuarterDocument, options);
        }
export function useGetPurchaseForQuarterSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetPurchaseForQuarterQuery, GetPurchaseForQuarterQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetPurchaseForQuarterQuery, GetPurchaseForQuarterQueryVariables>(GetPurchaseForQuarterDocument, options);
        }
export type GetPurchaseForQuarterQueryHookResult = ReturnType<typeof useGetPurchaseForQuarterQuery>;
export type GetPurchaseForQuarterLazyQueryHookResult = ReturnType<typeof useGetPurchaseForQuarterLazyQuery>;
export type GetPurchaseForQuarterSuspenseQueryHookResult = ReturnType<typeof useGetPurchaseForQuarterSuspenseQuery>;
export type GetPurchaseForQuarterQueryResult = Apollo.QueryResult<GetPurchaseForQuarterQuery, GetPurchaseForQuarterQueryVariables>;
export const GetPurchaseForWeekDocument = gql`
    query GetPurchaseForWeek($businessId: String!, $weekly: Boolean) {
  getPurchasesForWeek(businessId: $businessId, weekly: $weekly) {
    purchasesThisWeek
    totalPurchaseAmountThisWeek
    pendingPurchasesThisWeek
    totalPendingPurchaseAmountThisWeek
    paidPurchasesThisWeek
    totalPaidPurchaseAmountThisWeek
  }
}
    `;

/**
 * __useGetPurchaseForWeekQuery__
 *
 * To run a query within a React component, call `useGetPurchaseForWeekQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPurchaseForWeekQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPurchaseForWeekQuery({
 *   variables: {
 *      businessId: // value for 'businessId'
 *      weekly: // value for 'weekly'
 *   },
 * });
 */
export function useGetPurchaseForWeekQuery(baseOptions: Apollo.QueryHookOptions<GetPurchaseForWeekQuery, GetPurchaseForWeekQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPurchaseForWeekQuery, GetPurchaseForWeekQueryVariables>(GetPurchaseForWeekDocument, options);
      }
export function useGetPurchaseForWeekLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPurchaseForWeekQuery, GetPurchaseForWeekQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPurchaseForWeekQuery, GetPurchaseForWeekQueryVariables>(GetPurchaseForWeekDocument, options);
        }
export function useGetPurchaseForWeekSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetPurchaseForWeekQuery, GetPurchaseForWeekQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetPurchaseForWeekQuery, GetPurchaseForWeekQueryVariables>(GetPurchaseForWeekDocument, options);
        }
export type GetPurchaseForWeekQueryHookResult = ReturnType<typeof useGetPurchaseForWeekQuery>;
export type GetPurchaseForWeekLazyQueryHookResult = ReturnType<typeof useGetPurchaseForWeekLazyQuery>;
export type GetPurchaseForWeekSuspenseQueryHookResult = ReturnType<typeof useGetPurchaseForWeekSuspenseQuery>;
export type GetPurchaseForWeekQueryResult = Apollo.QueryResult<GetPurchaseForWeekQuery, GetPurchaseForWeekQueryVariables>;
export const GetPurchaseForYearDocument = gql`
    query GetPurchaseForYear($businessId: String!, $yearly: Boolean) {
  getPurchaseForYear(businessId: $businessId, yearly: $yearly) {
    purchasesThisYear
    totalPurchaseAmountThisYear
    pendingPurchasesThisYear
    totalPendingPurchaseAmountThisYear
    paidPurchasesThisYear
    totalPaidPurchaseAmountThisYear
  }
}
    `;

/**
 * __useGetPurchaseForYearQuery__
 *
 * To run a query within a React component, call `useGetPurchaseForYearQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPurchaseForYearQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPurchaseForYearQuery({
 *   variables: {
 *      businessId: // value for 'businessId'
 *      yearly: // value for 'yearly'
 *   },
 * });
 */
export function useGetPurchaseForYearQuery(baseOptions: Apollo.QueryHookOptions<GetPurchaseForYearQuery, GetPurchaseForYearQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPurchaseForYearQuery, GetPurchaseForYearQueryVariables>(GetPurchaseForYearDocument, options);
      }
export function useGetPurchaseForYearLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPurchaseForYearQuery, GetPurchaseForYearQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPurchaseForYearQuery, GetPurchaseForYearQueryVariables>(GetPurchaseForYearDocument, options);
        }
export function useGetPurchaseForYearSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetPurchaseForYearQuery, GetPurchaseForYearQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetPurchaseForYearQuery, GetPurchaseForYearQueryVariables>(GetPurchaseForYearDocument, options);
        }
export type GetPurchaseForYearQueryHookResult = ReturnType<typeof useGetPurchaseForYearQuery>;
export type GetPurchaseForYearLazyQueryHookResult = ReturnType<typeof useGetPurchaseForYearLazyQuery>;
export type GetPurchaseForYearSuspenseQueryHookResult = ReturnType<typeof useGetPurchaseForYearSuspenseQuery>;
export type GetPurchaseForYearQueryResult = Apollo.QueryResult<GetPurchaseForYearQuery, GetPurchaseForYearQueryVariables>;
export const GetSaleByBusinessDocument = gql`
    query GetSaleByBusiness($businessId: String!, $cursor: String, $sets: Float) {
  getSaleByBusiness(businessId: $businessId, cursor: $cursor, sets: $sets) {
    salesByBusiness {
      id
      description
      saleAmount
      paid
      business {
        businessName
      }
      transactionDate
      invoice {
        id
        totalAmount
        createdAt
        VAT
        paidFully
        discount
        dateOfIssue
        dueDate
        customer {
          id
          name
          email
          address
        }
        business {
          id
          businessName
          businessEmail
        }
        invoiceDetails {
          id
          index
          productInvoiceDetail {
            unitPrice
            quantity
            product {
              type
              productName
              productUnit {
                id
                unitName
              }
            }
          }
          serviceInvoiceDetail {
            unitPrice
            quantity
            service {
              type
              name
              serviceUnit {
                id
                unitName
              }
            }
          }
        }
      }
    }
    cursorId
  }
}
    `;

/**
 * __useGetSaleByBusinessQuery__
 *
 * To run a query within a React component, call `useGetSaleByBusinessQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSaleByBusinessQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSaleByBusinessQuery({
 *   variables: {
 *      businessId: // value for 'businessId'
 *      cursor: // value for 'cursor'
 *      sets: // value for 'sets'
 *   },
 * });
 */
export function useGetSaleByBusinessQuery(baseOptions: Apollo.QueryHookOptions<GetSaleByBusinessQuery, GetSaleByBusinessQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSaleByBusinessQuery, GetSaleByBusinessQueryVariables>(GetSaleByBusinessDocument, options);
      }
export function useGetSaleByBusinessLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSaleByBusinessQuery, GetSaleByBusinessQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSaleByBusinessQuery, GetSaleByBusinessQueryVariables>(GetSaleByBusinessDocument, options);
        }
export function useGetSaleByBusinessSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetSaleByBusinessQuery, GetSaleByBusinessQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetSaleByBusinessQuery, GetSaleByBusinessQueryVariables>(GetSaleByBusinessDocument, options);
        }
export type GetSaleByBusinessQueryHookResult = ReturnType<typeof useGetSaleByBusinessQuery>;
export type GetSaleByBusinessLazyQueryHookResult = ReturnType<typeof useGetSaleByBusinessLazyQuery>;
export type GetSaleByBusinessSuspenseQueryHookResult = ReturnType<typeof useGetSaleByBusinessSuspenseQuery>;
export type GetSaleByBusinessQueryResult = Apollo.QueryResult<GetSaleByBusinessQuery, GetSaleByBusinessQueryVariables>;
export const GetSaleByBusinessMobileDocument = gql`
    query GetSaleByBusinessMobile($businessId: String!, $cursor: String, $take: Float) {
  getSaleByBusinessMobile(businessId: $businessId, cursor: $cursor, take: $take) {
    salesByBusiness {
      id
      description
      saleAmount
      transactionDate
    }
    cursorId
  }
}
    `;

/**
 * __useGetSaleByBusinessMobileQuery__
 *
 * To run a query within a React component, call `useGetSaleByBusinessMobileQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSaleByBusinessMobileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSaleByBusinessMobileQuery({
 *   variables: {
 *      businessId: // value for 'businessId'
 *      cursor: // value for 'cursor'
 *      take: // value for 'take'
 *   },
 * });
 */
export function useGetSaleByBusinessMobileQuery(baseOptions: Apollo.QueryHookOptions<GetSaleByBusinessMobileQuery, GetSaleByBusinessMobileQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSaleByBusinessMobileQuery, GetSaleByBusinessMobileQueryVariables>(GetSaleByBusinessMobileDocument, options);
      }
export function useGetSaleByBusinessMobileLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSaleByBusinessMobileQuery, GetSaleByBusinessMobileQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSaleByBusinessMobileQuery, GetSaleByBusinessMobileQueryVariables>(GetSaleByBusinessMobileDocument, options);
        }
export function useGetSaleByBusinessMobileSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetSaleByBusinessMobileQuery, GetSaleByBusinessMobileQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetSaleByBusinessMobileQuery, GetSaleByBusinessMobileQueryVariables>(GetSaleByBusinessMobileDocument, options);
        }
export type GetSaleByBusinessMobileQueryHookResult = ReturnType<typeof useGetSaleByBusinessMobileQuery>;
export type GetSaleByBusinessMobileLazyQueryHookResult = ReturnType<typeof useGetSaleByBusinessMobileLazyQuery>;
export type GetSaleByBusinessMobileSuspenseQueryHookResult = ReturnType<typeof useGetSaleByBusinessMobileSuspenseQuery>;
export type GetSaleByBusinessMobileQueryResult = Apollo.QueryResult<GetSaleByBusinessMobileQuery, GetSaleByBusinessMobileQueryVariables>;
export const GetSaleByIdDocument = gql`
    query GetSaleById($saleId: String!) {
  getSaleById(saleId: $saleId) {
    id
    description
    reference
    saleStatus {
      id
      saleStatus
    }
    saleExpenses {
      id
      index
      saleId
      description
      amount
      effected
    }
    saleServiceExpenses {
      id
      effected
      amount
      index
      service {
        name
        id
      }
    }
    paid
    description
    saleAmount
    transactionDate
    dueDate
    invoice {
      totalAmount
      VAT
      id
      totalAmount
      createdAt
      subtotal
      VAT
      paidFully
      discount
      dateOfIssue
      dueDate
      customer {
        id
        name
        email
        address
        mobile
      }
      business {
        id
        businessName
        businessEmail
      }
      invoiceDetails {
        id
        type
        cost
        index
        productInvoiceDetail {
          type
          unitPrice
          quantity
          price
          product {
            id
            type
            productName
            price
            productUnit {
              id
              unitName
            }
          }
        }
        serviceInvoiceDetail {
          type
          unitPrice
          quantity
          price
          service {
            id
            type
            name
            price
            serviceUnit {
              id
              unitName
            }
          }
        }
      }
    }
  }
}
    `;

/**
 * __useGetSaleByIdQuery__
 *
 * To run a query within a React component, call `useGetSaleByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSaleByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSaleByIdQuery({
 *   variables: {
 *      saleId: // value for 'saleId'
 *   },
 * });
 */
export function useGetSaleByIdQuery(baseOptions: Apollo.QueryHookOptions<GetSaleByIdQuery, GetSaleByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSaleByIdQuery, GetSaleByIdQueryVariables>(GetSaleByIdDocument, options);
      }
export function useGetSaleByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSaleByIdQuery, GetSaleByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSaleByIdQuery, GetSaleByIdQueryVariables>(GetSaleByIdDocument, options);
        }
export function useGetSaleByIdSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetSaleByIdQuery, GetSaleByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetSaleByIdQuery, GetSaleByIdQueryVariables>(GetSaleByIdDocument, options);
        }
export type GetSaleByIdQueryHookResult = ReturnType<typeof useGetSaleByIdQuery>;
export type GetSaleByIdLazyQueryHookResult = ReturnType<typeof useGetSaleByIdLazyQuery>;
export type GetSaleByIdSuspenseQueryHookResult = ReturnType<typeof useGetSaleByIdSuspenseQuery>;
export type GetSaleByIdQueryResult = Apollo.QueryResult<GetSaleByIdQuery, GetSaleByIdQueryVariables>;
export const GetSalesForMonthDocument = gql`
    query GetSalesForMonth($businessId: String!, $monthly: Boolean, $cursor: String, $sets: Float) {
  getSalesForMonth(
    businessId: $businessId
    monthly: $monthly
    cursor: $cursor
    sets: $sets
  ) {
    salesThisMonth {
      id
      paidAt
      saleAmount
      invoice {
        customer {
          name
          email
        }
      }
    }
    numberOfSalesThisMonth
    cursorId
  }
}
    `;

/**
 * __useGetSalesForMonthQuery__
 *
 * To run a query within a React component, call `useGetSalesForMonthQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSalesForMonthQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSalesForMonthQuery({
 *   variables: {
 *      businessId: // value for 'businessId'
 *      monthly: // value for 'monthly'
 *      cursor: // value for 'cursor'
 *      sets: // value for 'sets'
 *   },
 * });
 */
export function useGetSalesForMonthQuery(baseOptions: Apollo.QueryHookOptions<GetSalesForMonthQuery, GetSalesForMonthQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSalesForMonthQuery, GetSalesForMonthQueryVariables>(GetSalesForMonthDocument, options);
      }
export function useGetSalesForMonthLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSalesForMonthQuery, GetSalesForMonthQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSalesForMonthQuery, GetSalesForMonthQueryVariables>(GetSalesForMonthDocument, options);
        }
export function useGetSalesForMonthSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetSalesForMonthQuery, GetSalesForMonthQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetSalesForMonthQuery, GetSalesForMonthQueryVariables>(GetSalesForMonthDocument, options);
        }
export type GetSalesForMonthQueryHookResult = ReturnType<typeof useGetSalesForMonthQuery>;
export type GetSalesForMonthLazyQueryHookResult = ReturnType<typeof useGetSalesForMonthLazyQuery>;
export type GetSalesForMonthSuspenseQueryHookResult = ReturnType<typeof useGetSalesForMonthSuspenseQuery>;
export type GetSalesForMonthQueryResult = Apollo.QueryResult<GetSalesForMonthQuery, GetSalesForMonthQueryVariables>;
export const GetSalesForQuarterDocument = gql`
    query GetSalesForQuarter($businessId: String!, $quarterly: Boolean, $cursor: String, $sets: Float) {
  getSalesForQuarter(
    businessId: $businessId
    quarterly: $quarterly
    cursor: $cursor
    sets: $sets
  ) {
    salesThisQuarter {
      id
      paidAt
      saleAmount
      invoice {
        customer {
          name
          email
        }
      }
    }
    numberOfSalesThisQuarter
    cursorId
  }
}
    `;

/**
 * __useGetSalesForQuarterQuery__
 *
 * To run a query within a React component, call `useGetSalesForQuarterQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSalesForQuarterQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSalesForQuarterQuery({
 *   variables: {
 *      businessId: // value for 'businessId'
 *      quarterly: // value for 'quarterly'
 *      cursor: // value for 'cursor'
 *      sets: // value for 'sets'
 *   },
 * });
 */
export function useGetSalesForQuarterQuery(baseOptions: Apollo.QueryHookOptions<GetSalesForQuarterQuery, GetSalesForQuarterQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSalesForQuarterQuery, GetSalesForQuarterQueryVariables>(GetSalesForQuarterDocument, options);
      }
export function useGetSalesForQuarterLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSalesForQuarterQuery, GetSalesForQuarterQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSalesForQuarterQuery, GetSalesForQuarterQueryVariables>(GetSalesForQuarterDocument, options);
        }
export function useGetSalesForQuarterSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetSalesForQuarterQuery, GetSalesForQuarterQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetSalesForQuarterQuery, GetSalesForQuarterQueryVariables>(GetSalesForQuarterDocument, options);
        }
export type GetSalesForQuarterQueryHookResult = ReturnType<typeof useGetSalesForQuarterQuery>;
export type GetSalesForQuarterLazyQueryHookResult = ReturnType<typeof useGetSalesForQuarterLazyQuery>;
export type GetSalesForQuarterSuspenseQueryHookResult = ReturnType<typeof useGetSalesForQuarterSuspenseQuery>;
export type GetSalesForQuarterQueryResult = Apollo.QueryResult<GetSalesForQuarterQuery, GetSalesForQuarterQueryVariables>;
export const GetSalesForWeekDocument = gql`
    query GetSalesForWeek($businessId: String!, $weekly: Boolean, $cursor: String, $sets: Float) {
  getSalesForWeek(
    businessId: $businessId
    weekly: $weekly
    cursor: $cursor
    sets: $sets
  ) {
    salesThisWeek {
      id
      paidAt
      saleAmount
      invoice {
        customer {
          name
          email
        }
      }
    }
    numberOfSalesThisWeek
    cursorId
  }
}
    `;

/**
 * __useGetSalesForWeekQuery__
 *
 * To run a query within a React component, call `useGetSalesForWeekQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSalesForWeekQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSalesForWeekQuery({
 *   variables: {
 *      businessId: // value for 'businessId'
 *      weekly: // value for 'weekly'
 *      cursor: // value for 'cursor'
 *      sets: // value for 'sets'
 *   },
 * });
 */
export function useGetSalesForWeekQuery(baseOptions: Apollo.QueryHookOptions<GetSalesForWeekQuery, GetSalesForWeekQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSalesForWeekQuery, GetSalesForWeekQueryVariables>(GetSalesForWeekDocument, options);
      }
export function useGetSalesForWeekLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSalesForWeekQuery, GetSalesForWeekQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSalesForWeekQuery, GetSalesForWeekQueryVariables>(GetSalesForWeekDocument, options);
        }
export function useGetSalesForWeekSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetSalesForWeekQuery, GetSalesForWeekQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetSalesForWeekQuery, GetSalesForWeekQueryVariables>(GetSalesForWeekDocument, options);
        }
export type GetSalesForWeekQueryHookResult = ReturnType<typeof useGetSalesForWeekQuery>;
export type GetSalesForWeekLazyQueryHookResult = ReturnType<typeof useGetSalesForWeekLazyQuery>;
export type GetSalesForWeekSuspenseQueryHookResult = ReturnType<typeof useGetSalesForWeekSuspenseQuery>;
export type GetSalesForWeekQueryResult = Apollo.QueryResult<GetSalesForWeekQuery, GetSalesForWeekQueryVariables>;
export const GetSalesForYearDocument = gql`
    query GetSalesForYear($businessId: String!, $yearly: Boolean, $cursor: String, $sets: Float) {
  getSalesForYear(
    businessId: $businessId
    yearly: $yearly
    cursor: $cursor
    sets: $sets
  ) {
    salesThisYear {
      id
      paidAt
      saleAmount
      invoice {
        customer {
          name
          email
        }
      }
    }
    numberOfSalesThisYear
    cursorId
  }
}
    `;

/**
 * __useGetSalesForYearQuery__
 *
 * To run a query within a React component, call `useGetSalesForYearQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSalesForYearQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSalesForYearQuery({
 *   variables: {
 *      businessId: // value for 'businessId'
 *      yearly: // value for 'yearly'
 *      cursor: // value for 'cursor'
 *      sets: // value for 'sets'
 *   },
 * });
 */
export function useGetSalesForYearQuery(baseOptions: Apollo.QueryHookOptions<GetSalesForYearQuery, GetSalesForYearQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSalesForYearQuery, GetSalesForYearQueryVariables>(GetSalesForYearDocument, options);
      }
export function useGetSalesForYearLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSalesForYearQuery, GetSalesForYearQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSalesForYearQuery, GetSalesForYearQueryVariables>(GetSalesForYearDocument, options);
        }
export function useGetSalesForYearSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetSalesForYearQuery, GetSalesForYearQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetSalesForYearQuery, GetSalesForYearQueryVariables>(GetSalesForYearDocument, options);
        }
export type GetSalesForYearQueryHookResult = ReturnType<typeof useGetSalesForYearQuery>;
export type GetSalesForYearLazyQueryHookResult = ReturnType<typeof useGetSalesForYearLazyQuery>;
export type GetSalesForYearSuspenseQueryHookResult = ReturnType<typeof useGetSalesForYearSuspenseQuery>;
export type GetSalesForYearQueryResult = Apollo.QueryResult<GetSalesForYearQuery, GetSalesForYearQueryVariables>;
export const GetServiceByIdDocument = gql`
    query GetServiceById($serviceId: String!) {
  getServiceById(serviceId: $serviceId) {
    name
    price
    serviceUnit {
      unitName
    }
    serviceUnitId
  }
}
    `;

/**
 * __useGetServiceByIdQuery__
 *
 * To run a query within a React component, call `useGetServiceByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetServiceByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetServiceByIdQuery({
 *   variables: {
 *      serviceId: // value for 'serviceId'
 *   },
 * });
 */
export function useGetServiceByIdQuery(baseOptions: Apollo.QueryHookOptions<GetServiceByIdQuery, GetServiceByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetServiceByIdQuery, GetServiceByIdQueryVariables>(GetServiceByIdDocument, options);
      }
export function useGetServiceByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetServiceByIdQuery, GetServiceByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetServiceByIdQuery, GetServiceByIdQueryVariables>(GetServiceByIdDocument, options);
        }
export function useGetServiceByIdSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetServiceByIdQuery, GetServiceByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetServiceByIdQuery, GetServiceByIdQueryVariables>(GetServiceByIdDocument, options);
        }
export type GetServiceByIdQueryHookResult = ReturnType<typeof useGetServiceByIdQuery>;
export type GetServiceByIdLazyQueryHookResult = ReturnType<typeof useGetServiceByIdLazyQuery>;
export type GetServiceByIdSuspenseQueryHookResult = ReturnType<typeof useGetServiceByIdSuspenseQuery>;
export type GetServiceByIdQueryResult = Apollo.QueryResult<GetServiceByIdQuery, GetServiceByIdQueryVariables>;
export const GetServiceForWeekDocument = gql`
    query GetServiceForWeek($businessId: String!, $weekly: Boolean) {
  getServiceForWeek(businessId: $businessId, weekly: $weekly) {
    servicesThisWeek
    totalServiceAmountThisWeek
  }
}
    `;

/**
 * __useGetServiceForWeekQuery__
 *
 * To run a query within a React component, call `useGetServiceForWeekQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetServiceForWeekQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetServiceForWeekQuery({
 *   variables: {
 *      businessId: // value for 'businessId'
 *      weekly: // value for 'weekly'
 *   },
 * });
 */
export function useGetServiceForWeekQuery(baseOptions: Apollo.QueryHookOptions<GetServiceForWeekQuery, GetServiceForWeekQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetServiceForWeekQuery, GetServiceForWeekQueryVariables>(GetServiceForWeekDocument, options);
      }
export function useGetServiceForWeekLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetServiceForWeekQuery, GetServiceForWeekQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetServiceForWeekQuery, GetServiceForWeekQueryVariables>(GetServiceForWeekDocument, options);
        }
export function useGetServiceForWeekSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetServiceForWeekQuery, GetServiceForWeekQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetServiceForWeekQuery, GetServiceForWeekQueryVariables>(GetServiceForWeekDocument, options);
        }
export type GetServiceForWeekQueryHookResult = ReturnType<typeof useGetServiceForWeekQuery>;
export type GetServiceForWeekLazyQueryHookResult = ReturnType<typeof useGetServiceForWeekLazyQuery>;
export type GetServiceForWeekSuspenseQueryHookResult = ReturnType<typeof useGetServiceForWeekSuspenseQuery>;
export type GetServiceForWeekQueryResult = Apollo.QueryResult<GetServiceForWeekQuery, GetServiceForWeekQueryVariables>;
export const GetServiceUnitsDocument = gql`
    query GetServiceUnits {
  getServiceUnits {
    id
    unitName
    createdAt
  }
}
    `;

/**
 * __useGetServiceUnitsQuery__
 *
 * To run a query within a React component, call `useGetServiceUnitsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetServiceUnitsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetServiceUnitsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetServiceUnitsQuery(baseOptions?: Apollo.QueryHookOptions<GetServiceUnitsQuery, GetServiceUnitsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetServiceUnitsQuery, GetServiceUnitsQueryVariables>(GetServiceUnitsDocument, options);
      }
export function useGetServiceUnitsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetServiceUnitsQuery, GetServiceUnitsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetServiceUnitsQuery, GetServiceUnitsQueryVariables>(GetServiceUnitsDocument, options);
        }
export function useGetServiceUnitsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetServiceUnitsQuery, GetServiceUnitsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetServiceUnitsQuery, GetServiceUnitsQueryVariables>(GetServiceUnitsDocument, options);
        }
export type GetServiceUnitsQueryHookResult = ReturnType<typeof useGetServiceUnitsQuery>;
export type GetServiceUnitsLazyQueryHookResult = ReturnType<typeof useGetServiceUnitsLazyQuery>;
export type GetServiceUnitsSuspenseQueryHookResult = ReturnType<typeof useGetServiceUnitsSuspenseQuery>;
export type GetServiceUnitsQueryResult = Apollo.QueryResult<GetServiceUnitsQuery, GetServiceUnitsQueryVariables>;
export const GetServiceByBusinessDocument = gql`
    query GetServiceByBusiness($businessId: String!, $cursor: String, $sets: Float) {
  getServiceByBusiness(businessId: $businessId, cursor: $cursor, sets: $sets) {
    serviceByBusiness {
      id
      name
      price
      type
      serviceUnit {
        unitName
      }
      serviceUnitId
      businessId
      isArchived
      createdAt
    }
    cursorId
  }
}
    `;

/**
 * __useGetServiceByBusinessQuery__
 *
 * To run a query within a React component, call `useGetServiceByBusinessQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetServiceByBusinessQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetServiceByBusinessQuery({
 *   variables: {
 *      businessId: // value for 'businessId'
 *      cursor: // value for 'cursor'
 *      sets: // value for 'sets'
 *   },
 * });
 */
export function useGetServiceByBusinessQuery(baseOptions: Apollo.QueryHookOptions<GetServiceByBusinessQuery, GetServiceByBusinessQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetServiceByBusinessQuery, GetServiceByBusinessQueryVariables>(GetServiceByBusinessDocument, options);
      }
export function useGetServiceByBusinessLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetServiceByBusinessQuery, GetServiceByBusinessQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetServiceByBusinessQuery, GetServiceByBusinessQueryVariables>(GetServiceByBusinessDocument, options);
        }
export function useGetServiceByBusinessSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetServiceByBusinessQuery, GetServiceByBusinessQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetServiceByBusinessQuery, GetServiceByBusinessQueryVariables>(GetServiceByBusinessDocument, options);
        }
export type GetServiceByBusinessQueryHookResult = ReturnType<typeof useGetServiceByBusinessQuery>;
export type GetServiceByBusinessLazyQueryHookResult = ReturnType<typeof useGetServiceByBusinessLazyQuery>;
export type GetServiceByBusinessSuspenseQueryHookResult = ReturnType<typeof useGetServiceByBusinessSuspenseQuery>;
export type GetServiceByBusinessQueryResult = Apollo.QueryResult<GetServiceByBusinessQuery, GetServiceByBusinessQueryVariables>;
export const GetSubscriptionByBusinessDocument = gql`
    query GetSubscriptionByBusiness($businessId: String!) {
  getSubscriptionByBusiness(businessId: $businessId) {
    id
    dateSubscribed
    dateUnsubscribed
    validTo
    business {
      businessName
    }
    plan {
      id
      planName
      currentPrice
    }
    subscriptionInvoice {
      invoiceTotal
      invoicePaid
    }
    subscriptionPayment {
      amount
    }
  }
}
    `;

/**
 * __useGetSubscriptionByBusinessQuery__
 *
 * To run a query within a React component, call `useGetSubscriptionByBusinessQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSubscriptionByBusinessQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSubscriptionByBusinessQuery({
 *   variables: {
 *      businessId: // value for 'businessId'
 *   },
 * });
 */
export function useGetSubscriptionByBusinessQuery(baseOptions: Apollo.QueryHookOptions<GetSubscriptionByBusinessQuery, GetSubscriptionByBusinessQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSubscriptionByBusinessQuery, GetSubscriptionByBusinessQueryVariables>(GetSubscriptionByBusinessDocument, options);
      }
export function useGetSubscriptionByBusinessLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSubscriptionByBusinessQuery, GetSubscriptionByBusinessQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSubscriptionByBusinessQuery, GetSubscriptionByBusinessQueryVariables>(GetSubscriptionByBusinessDocument, options);
        }
export function useGetSubscriptionByBusinessSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetSubscriptionByBusinessQuery, GetSubscriptionByBusinessQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetSubscriptionByBusinessQuery, GetSubscriptionByBusinessQueryVariables>(GetSubscriptionByBusinessDocument, options);
        }
export type GetSubscriptionByBusinessQueryHookResult = ReturnType<typeof useGetSubscriptionByBusinessQuery>;
export type GetSubscriptionByBusinessLazyQueryHookResult = ReturnType<typeof useGetSubscriptionByBusinessLazyQuery>;
export type GetSubscriptionByBusinessSuspenseQueryHookResult = ReturnType<typeof useGetSubscriptionByBusinessSuspenseQuery>;
export type GetSubscriptionByBusinessQueryResult = Apollo.QueryResult<GetSubscriptionByBusinessQuery, GetSubscriptionByBusinessQueryVariables>;
export const GetSubscriptionInvoiceByBusinessDocument = gql`
    query GetSubscriptionInvoiceByBusiness($businessId: String!) {
  getSubscriptionInvoiceByBusiness(businessId: $businessId) {
    id
    subscription {
      subscriptionPayment {
        amount
      }
    }
    tax
    invoicePaid
    invoiceTotal
  }
}
    `;

/**
 * __useGetSubscriptionInvoiceByBusinessQuery__
 *
 * To run a query within a React component, call `useGetSubscriptionInvoiceByBusinessQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSubscriptionInvoiceByBusinessQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSubscriptionInvoiceByBusinessQuery({
 *   variables: {
 *      businessId: // value for 'businessId'
 *   },
 * });
 */
export function useGetSubscriptionInvoiceByBusinessQuery(baseOptions: Apollo.QueryHookOptions<GetSubscriptionInvoiceByBusinessQuery, GetSubscriptionInvoiceByBusinessQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSubscriptionInvoiceByBusinessQuery, GetSubscriptionInvoiceByBusinessQueryVariables>(GetSubscriptionInvoiceByBusinessDocument, options);
      }
export function useGetSubscriptionInvoiceByBusinessLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSubscriptionInvoiceByBusinessQuery, GetSubscriptionInvoiceByBusinessQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSubscriptionInvoiceByBusinessQuery, GetSubscriptionInvoiceByBusinessQueryVariables>(GetSubscriptionInvoiceByBusinessDocument, options);
        }
export function useGetSubscriptionInvoiceByBusinessSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetSubscriptionInvoiceByBusinessQuery, GetSubscriptionInvoiceByBusinessQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetSubscriptionInvoiceByBusinessQuery, GetSubscriptionInvoiceByBusinessQueryVariables>(GetSubscriptionInvoiceByBusinessDocument, options);
        }
export type GetSubscriptionInvoiceByBusinessQueryHookResult = ReturnType<typeof useGetSubscriptionInvoiceByBusinessQuery>;
export type GetSubscriptionInvoiceByBusinessLazyQueryHookResult = ReturnType<typeof useGetSubscriptionInvoiceByBusinessLazyQuery>;
export type GetSubscriptionInvoiceByBusinessSuspenseQueryHookResult = ReturnType<typeof useGetSubscriptionInvoiceByBusinessSuspenseQuery>;
export type GetSubscriptionInvoiceByBusinessQueryResult = Apollo.QueryResult<GetSubscriptionInvoiceByBusinessQuery, GetSubscriptionInvoiceByBusinessQueryVariables>;
export const TotalMonthlyInvoicesAmountDocument = gql`
    query TotalMonthlyInvoicesAmount($businessId: String!, $monthly: Boolean) {
  totalMonthlyInvoicesAmount(businessId: $businessId, monthly: $monthly) {
    dailyTotalAmountsForMonth {
      date
      totalAmount
      totalPendingAmount
      totalPaidAmount
    }
    totalInvoiceAmountForMonth
    percentageOfPaidInvoicesForMonth
    totalPendingInvoiceAmountThisMonth
    percentageIncreaseInPendingInvoiceThisMonth
    totalOverdueInvoiceAmountThisMonth
    percentageIncreaseInOverdueInvoicesThisMonth
    percentageIncreaseInInvoicesThisMonth
  }
}
    `;

/**
 * __useTotalMonthlyInvoicesAmountQuery__
 *
 * To run a query within a React component, call `useTotalMonthlyInvoicesAmountQuery` and pass it any options that fit your needs.
 * When your component renders, `useTotalMonthlyInvoicesAmountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTotalMonthlyInvoicesAmountQuery({
 *   variables: {
 *      businessId: // value for 'businessId'
 *      monthly: // value for 'monthly'
 *   },
 * });
 */
export function useTotalMonthlyInvoicesAmountQuery(baseOptions: Apollo.QueryHookOptions<TotalMonthlyInvoicesAmountQuery, TotalMonthlyInvoicesAmountQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TotalMonthlyInvoicesAmountQuery, TotalMonthlyInvoicesAmountQueryVariables>(TotalMonthlyInvoicesAmountDocument, options);
      }
export function useTotalMonthlyInvoicesAmountLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TotalMonthlyInvoicesAmountQuery, TotalMonthlyInvoicesAmountQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TotalMonthlyInvoicesAmountQuery, TotalMonthlyInvoicesAmountQueryVariables>(TotalMonthlyInvoicesAmountDocument, options);
        }
export function useTotalMonthlyInvoicesAmountSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<TotalMonthlyInvoicesAmountQuery, TotalMonthlyInvoicesAmountQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<TotalMonthlyInvoicesAmountQuery, TotalMonthlyInvoicesAmountQueryVariables>(TotalMonthlyInvoicesAmountDocument, options);
        }
export type TotalMonthlyInvoicesAmountQueryHookResult = ReturnType<typeof useTotalMonthlyInvoicesAmountQuery>;
export type TotalMonthlyInvoicesAmountLazyQueryHookResult = ReturnType<typeof useTotalMonthlyInvoicesAmountLazyQuery>;
export type TotalMonthlyInvoicesAmountSuspenseQueryHookResult = ReturnType<typeof useTotalMonthlyInvoicesAmountSuspenseQuery>;
export type TotalMonthlyInvoicesAmountQueryResult = Apollo.QueryResult<TotalMonthlyInvoicesAmountQuery, TotalMonthlyInvoicesAmountQueryVariables>;
export const TotalQuarterlyInvoicesAmountDocument = gql`
    query TotalQuarterlyInvoicesAmount($businessId: String!, $quarterly: Boolean) {
  totalQuarterlyInvoicesAmount(businessId: $businessId, quarterly: $quarterly) {
    quarterInvoiceAmounts {
      month
      invoiceAmount
      invoicePending
      invoicePaid
    }
    totalInvoiceAmountForQuarter
    percentageOfInvoicePaidForQuarter
    totalPendingInvoiceAmountThisQuarter
    percentageIncreaseInPendingInvoiceThisQuarter
    totalOverdueInvoiceAmountThisQuarter
    percentageIncreaseInOverdueInvoiceThisQuarter
    percentageIncreaseInInvoiceThisQuarter
  }
}
    `;

/**
 * __useTotalQuarterlyInvoicesAmountQuery__
 *
 * To run a query within a React component, call `useTotalQuarterlyInvoicesAmountQuery` and pass it any options that fit your needs.
 * When your component renders, `useTotalQuarterlyInvoicesAmountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTotalQuarterlyInvoicesAmountQuery({
 *   variables: {
 *      businessId: // value for 'businessId'
 *      quarterly: // value for 'quarterly'
 *   },
 * });
 */
export function useTotalQuarterlyInvoicesAmountQuery(baseOptions: Apollo.QueryHookOptions<TotalQuarterlyInvoicesAmountQuery, TotalQuarterlyInvoicesAmountQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TotalQuarterlyInvoicesAmountQuery, TotalQuarterlyInvoicesAmountQueryVariables>(TotalQuarterlyInvoicesAmountDocument, options);
      }
export function useTotalQuarterlyInvoicesAmountLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TotalQuarterlyInvoicesAmountQuery, TotalQuarterlyInvoicesAmountQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TotalQuarterlyInvoicesAmountQuery, TotalQuarterlyInvoicesAmountQueryVariables>(TotalQuarterlyInvoicesAmountDocument, options);
        }
export function useTotalQuarterlyInvoicesAmountSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<TotalQuarterlyInvoicesAmountQuery, TotalQuarterlyInvoicesAmountQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<TotalQuarterlyInvoicesAmountQuery, TotalQuarterlyInvoicesAmountQueryVariables>(TotalQuarterlyInvoicesAmountDocument, options);
        }
export type TotalQuarterlyInvoicesAmountQueryHookResult = ReturnType<typeof useTotalQuarterlyInvoicesAmountQuery>;
export type TotalQuarterlyInvoicesAmountLazyQueryHookResult = ReturnType<typeof useTotalQuarterlyInvoicesAmountLazyQuery>;
export type TotalQuarterlyInvoicesAmountSuspenseQueryHookResult = ReturnType<typeof useTotalQuarterlyInvoicesAmountSuspenseQuery>;
export type TotalQuarterlyInvoicesAmountQueryResult = Apollo.QueryResult<TotalQuarterlyInvoicesAmountQuery, TotalQuarterlyInvoicesAmountQueryVariables>;
export const TotalWeeklyInvoicesAmountDocument = gql`
    query TotalWeeklyInvoicesAmount($businessId: String!, $weekly: Boolean) {
  totalWeeklyInvoicesAmount(businessId: $businessId, weekly: $weekly) {
    dailyTotalAmounts {
      date
      dayOfWeek
      totalAmount
      totalPendingAmount
      totalPaidAmount
    }
    totalInvoiceAmountForWeek
    percentageOfPaidInvoices
    totalPendingInvoiceAmountThisWeek
    percentageIncreaseInPendingInvoiceThisWeek
    totalOverDueInvoiceAmountThisWeek
    percentageIncreaseInOverdueInvoicesThisWeek
    percentageOfIncreaseInInvoicesThisWeek
  }
}
    `;

/**
 * __useTotalWeeklyInvoicesAmountQuery__
 *
 * To run a query within a React component, call `useTotalWeeklyInvoicesAmountQuery` and pass it any options that fit your needs.
 * When your component renders, `useTotalWeeklyInvoicesAmountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTotalWeeklyInvoicesAmountQuery({
 *   variables: {
 *      businessId: // value for 'businessId'
 *      weekly: // value for 'weekly'
 *   },
 * });
 */
export function useTotalWeeklyInvoicesAmountQuery(baseOptions: Apollo.QueryHookOptions<TotalWeeklyInvoicesAmountQuery, TotalWeeklyInvoicesAmountQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TotalWeeklyInvoicesAmountQuery, TotalWeeklyInvoicesAmountQueryVariables>(TotalWeeklyInvoicesAmountDocument, options);
      }
export function useTotalWeeklyInvoicesAmountLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TotalWeeklyInvoicesAmountQuery, TotalWeeklyInvoicesAmountQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TotalWeeklyInvoicesAmountQuery, TotalWeeklyInvoicesAmountQueryVariables>(TotalWeeklyInvoicesAmountDocument, options);
        }
export function useTotalWeeklyInvoicesAmountSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<TotalWeeklyInvoicesAmountQuery, TotalWeeklyInvoicesAmountQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<TotalWeeklyInvoicesAmountQuery, TotalWeeklyInvoicesAmountQueryVariables>(TotalWeeklyInvoicesAmountDocument, options);
        }
export type TotalWeeklyInvoicesAmountQueryHookResult = ReturnType<typeof useTotalWeeklyInvoicesAmountQuery>;
export type TotalWeeklyInvoicesAmountLazyQueryHookResult = ReturnType<typeof useTotalWeeklyInvoicesAmountLazyQuery>;
export type TotalWeeklyInvoicesAmountSuspenseQueryHookResult = ReturnType<typeof useTotalWeeklyInvoicesAmountSuspenseQuery>;
export type TotalWeeklyInvoicesAmountQueryResult = Apollo.QueryResult<TotalWeeklyInvoicesAmountQuery, TotalWeeklyInvoicesAmountQueryVariables>;
export const TotalYearlyInvoicesAmountDocument = gql`
    query TotalYearlyInvoicesAmount($businessId: String!, $yearly: Boolean) {
  totalYearlyInvoicesAmount(businessId: $businessId, yearly: $yearly) {
    monthlyTotalAmounts {
      month
      totalInvoicesAmount
      totalPendingInvoicesAmount
      totalPaidInvoicesAmount
    }
    totalInvoiceAmountForYear
    percentageOfInvoicesPaidForYear
    totalPendingInvoiceAmountThisYear
    percentageIncreaseInPendingInvoiceThisYear
    totalOverdueInvoiceAmountThisYear
    percentageIncreaseInOverdueInvoicesThisYear
    percentageIncreaseInInvoiceThisYear
  }
}
    `;

/**
 * __useTotalYearlyInvoicesAmountQuery__
 *
 * To run a query within a React component, call `useTotalYearlyInvoicesAmountQuery` and pass it any options that fit your needs.
 * When your component renders, `useTotalYearlyInvoicesAmountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTotalYearlyInvoicesAmountQuery({
 *   variables: {
 *      businessId: // value for 'businessId'
 *      yearly: // value for 'yearly'
 *   },
 * });
 */
export function useTotalYearlyInvoicesAmountQuery(baseOptions: Apollo.QueryHookOptions<TotalYearlyInvoicesAmountQuery, TotalYearlyInvoicesAmountQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TotalYearlyInvoicesAmountQuery, TotalYearlyInvoicesAmountQueryVariables>(TotalYearlyInvoicesAmountDocument, options);
      }
export function useTotalYearlyInvoicesAmountLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TotalYearlyInvoicesAmountQuery, TotalYearlyInvoicesAmountQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TotalYearlyInvoicesAmountQuery, TotalYearlyInvoicesAmountQueryVariables>(TotalYearlyInvoicesAmountDocument, options);
        }
export function useTotalYearlyInvoicesAmountSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<TotalYearlyInvoicesAmountQuery, TotalYearlyInvoicesAmountQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<TotalYearlyInvoicesAmountQuery, TotalYearlyInvoicesAmountQueryVariables>(TotalYearlyInvoicesAmountDocument, options);
        }
export type TotalYearlyInvoicesAmountQueryHookResult = ReturnType<typeof useTotalYearlyInvoicesAmountQuery>;
export type TotalYearlyInvoicesAmountLazyQueryHookResult = ReturnType<typeof useTotalYearlyInvoicesAmountLazyQuery>;
export type TotalYearlyInvoicesAmountSuspenseQueryHookResult = ReturnType<typeof useTotalYearlyInvoicesAmountSuspenseQuery>;
export type TotalYearlyInvoicesAmountQueryResult = Apollo.QueryResult<TotalYearlyInvoicesAmountQuery, TotalYearlyInvoicesAmountQueryVariables>;
export const GetUserByIdDocument = gql`
    query GetUserById {
  getUserById {
    id
    fullname
    email
  }
}
    `;

/**
 * __useGetUserByIdQuery__
 *
 * To run a query within a React component, call `useGetUserByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserByIdQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUserByIdQuery(baseOptions?: Apollo.QueryHookOptions<GetUserByIdQuery, GetUserByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserByIdQuery, GetUserByIdQueryVariables>(GetUserByIdDocument, options);
      }
export function useGetUserByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserByIdQuery, GetUserByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserByIdQuery, GetUserByIdQueryVariables>(GetUserByIdDocument, options);
        }
export function useGetUserByIdSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetUserByIdQuery, GetUserByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUserByIdQuery, GetUserByIdQueryVariables>(GetUserByIdDocument, options);
        }
export type GetUserByIdQueryHookResult = ReturnType<typeof useGetUserByIdQuery>;
export type GetUserByIdLazyQueryHookResult = ReturnType<typeof useGetUserByIdLazyQuery>;
export type GetUserByIdSuspenseQueryHookResult = ReturnType<typeof useGetUserByIdSuspenseQuery>;
export type GetUserByIdQueryResult = Apollo.QueryResult<GetUserByIdQuery, GetUserByIdQueryVariables>;
export const InvoiceAndExpenseGraphMonthlyDocument = gql`
    query InvoiceAndExpenseGraphMonthly($businessId: String!, $monthly: Boolean) {
  invoiceAndExpenseGraphMonthly(businessId: $businessId, monthly: $monthly) {
    date
    totalAmount
    totalInvoiceAmount
    totalExpenseAmount
  }
}
    `;

/**
 * __useInvoiceAndExpenseGraphMonthlyQuery__
 *
 * To run a query within a React component, call `useInvoiceAndExpenseGraphMonthlyQuery` and pass it any options that fit your needs.
 * When your component renders, `useInvoiceAndExpenseGraphMonthlyQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useInvoiceAndExpenseGraphMonthlyQuery({
 *   variables: {
 *      businessId: // value for 'businessId'
 *      monthly: // value for 'monthly'
 *   },
 * });
 */
export function useInvoiceAndExpenseGraphMonthlyQuery(baseOptions: Apollo.QueryHookOptions<InvoiceAndExpenseGraphMonthlyQuery, InvoiceAndExpenseGraphMonthlyQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<InvoiceAndExpenseGraphMonthlyQuery, InvoiceAndExpenseGraphMonthlyQueryVariables>(InvoiceAndExpenseGraphMonthlyDocument, options);
      }
export function useInvoiceAndExpenseGraphMonthlyLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<InvoiceAndExpenseGraphMonthlyQuery, InvoiceAndExpenseGraphMonthlyQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<InvoiceAndExpenseGraphMonthlyQuery, InvoiceAndExpenseGraphMonthlyQueryVariables>(InvoiceAndExpenseGraphMonthlyDocument, options);
        }
export function useInvoiceAndExpenseGraphMonthlySuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<InvoiceAndExpenseGraphMonthlyQuery, InvoiceAndExpenseGraphMonthlyQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<InvoiceAndExpenseGraphMonthlyQuery, InvoiceAndExpenseGraphMonthlyQueryVariables>(InvoiceAndExpenseGraphMonthlyDocument, options);
        }
export type InvoiceAndExpenseGraphMonthlyQueryHookResult = ReturnType<typeof useInvoiceAndExpenseGraphMonthlyQuery>;
export type InvoiceAndExpenseGraphMonthlyLazyQueryHookResult = ReturnType<typeof useInvoiceAndExpenseGraphMonthlyLazyQuery>;
export type InvoiceAndExpenseGraphMonthlySuspenseQueryHookResult = ReturnType<typeof useInvoiceAndExpenseGraphMonthlySuspenseQuery>;
export type InvoiceAndExpenseGraphMonthlyQueryResult = Apollo.QueryResult<InvoiceAndExpenseGraphMonthlyQuery, InvoiceAndExpenseGraphMonthlyQueryVariables>;
export const InvoiceAndExpenseGraphQuarterlyDocument = gql`
    query InvoiceAndExpenseGraphQuarterly($businessId: String!, $quarterly: Boolean) {
  invoiceAndExpenseGraphQuarterly(businessId: $businessId, quarterly: $quarterly) {
    month
    totalAmount
    invoiceAmount
    expenseAmount
  }
}
    `;

/**
 * __useInvoiceAndExpenseGraphQuarterlyQuery__
 *
 * To run a query within a React component, call `useInvoiceAndExpenseGraphQuarterlyQuery` and pass it any options that fit your needs.
 * When your component renders, `useInvoiceAndExpenseGraphQuarterlyQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useInvoiceAndExpenseGraphQuarterlyQuery({
 *   variables: {
 *      businessId: // value for 'businessId'
 *      quarterly: // value for 'quarterly'
 *   },
 * });
 */
export function useInvoiceAndExpenseGraphQuarterlyQuery(baseOptions: Apollo.QueryHookOptions<InvoiceAndExpenseGraphQuarterlyQuery, InvoiceAndExpenseGraphQuarterlyQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<InvoiceAndExpenseGraphQuarterlyQuery, InvoiceAndExpenseGraphQuarterlyQueryVariables>(InvoiceAndExpenseGraphQuarterlyDocument, options);
      }
export function useInvoiceAndExpenseGraphQuarterlyLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<InvoiceAndExpenseGraphQuarterlyQuery, InvoiceAndExpenseGraphQuarterlyQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<InvoiceAndExpenseGraphQuarterlyQuery, InvoiceAndExpenseGraphQuarterlyQueryVariables>(InvoiceAndExpenseGraphQuarterlyDocument, options);
        }
export function useInvoiceAndExpenseGraphQuarterlySuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<InvoiceAndExpenseGraphQuarterlyQuery, InvoiceAndExpenseGraphQuarterlyQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<InvoiceAndExpenseGraphQuarterlyQuery, InvoiceAndExpenseGraphQuarterlyQueryVariables>(InvoiceAndExpenseGraphQuarterlyDocument, options);
        }
export type InvoiceAndExpenseGraphQuarterlyQueryHookResult = ReturnType<typeof useInvoiceAndExpenseGraphQuarterlyQuery>;
export type InvoiceAndExpenseGraphQuarterlyLazyQueryHookResult = ReturnType<typeof useInvoiceAndExpenseGraphQuarterlyLazyQuery>;
export type InvoiceAndExpenseGraphQuarterlySuspenseQueryHookResult = ReturnType<typeof useInvoiceAndExpenseGraphQuarterlySuspenseQuery>;
export type InvoiceAndExpenseGraphQuarterlyQueryResult = Apollo.QueryResult<InvoiceAndExpenseGraphQuarterlyQuery, InvoiceAndExpenseGraphQuarterlyQueryVariables>;
export const InvoiceAndExpenseGraphWeeklyDocument = gql`
    query InvoiceAndExpenseGraphWeekly($businessId: String!, $weekly: Boolean) {
  invoiceAndExpenseGraphWeekly(businessId: $businessId, weekly: $weekly) {
    date
    dayOfWeek
    total
    totalExpenseAmount
    totalInvoiceAmount
  }
}
    `;

/**
 * __useInvoiceAndExpenseGraphWeeklyQuery__
 *
 * To run a query within a React component, call `useInvoiceAndExpenseGraphWeeklyQuery` and pass it any options that fit your needs.
 * When your component renders, `useInvoiceAndExpenseGraphWeeklyQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useInvoiceAndExpenseGraphWeeklyQuery({
 *   variables: {
 *      businessId: // value for 'businessId'
 *      weekly: // value for 'weekly'
 *   },
 * });
 */
export function useInvoiceAndExpenseGraphWeeklyQuery(baseOptions: Apollo.QueryHookOptions<InvoiceAndExpenseGraphWeeklyQuery, InvoiceAndExpenseGraphWeeklyQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<InvoiceAndExpenseGraphWeeklyQuery, InvoiceAndExpenseGraphWeeklyQueryVariables>(InvoiceAndExpenseGraphWeeklyDocument, options);
      }
export function useInvoiceAndExpenseGraphWeeklyLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<InvoiceAndExpenseGraphWeeklyQuery, InvoiceAndExpenseGraphWeeklyQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<InvoiceAndExpenseGraphWeeklyQuery, InvoiceAndExpenseGraphWeeklyQueryVariables>(InvoiceAndExpenseGraphWeeklyDocument, options);
        }
export function useInvoiceAndExpenseGraphWeeklySuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<InvoiceAndExpenseGraphWeeklyQuery, InvoiceAndExpenseGraphWeeklyQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<InvoiceAndExpenseGraphWeeklyQuery, InvoiceAndExpenseGraphWeeklyQueryVariables>(InvoiceAndExpenseGraphWeeklyDocument, options);
        }
export type InvoiceAndExpenseGraphWeeklyQueryHookResult = ReturnType<typeof useInvoiceAndExpenseGraphWeeklyQuery>;
export type InvoiceAndExpenseGraphWeeklyLazyQueryHookResult = ReturnType<typeof useInvoiceAndExpenseGraphWeeklyLazyQuery>;
export type InvoiceAndExpenseGraphWeeklySuspenseQueryHookResult = ReturnType<typeof useInvoiceAndExpenseGraphWeeklySuspenseQuery>;
export type InvoiceAndExpenseGraphWeeklyQueryResult = Apollo.QueryResult<InvoiceAndExpenseGraphWeeklyQuery, InvoiceAndExpenseGraphWeeklyQueryVariables>;
export const InvoiceAndExpenseGraphYearlyDocument = gql`
    query InvoiceAndExpenseGraphYearly($businessId: String!, $yearly: Boolean) {
  invoiceAndExpenseGraphYearly(businessId: $businessId, yearly: $yearly) {
    month
    totalAmount
    totalInvoicesAmount
    totalExpenseAmount
  }
}
    `;

/**
 * __useInvoiceAndExpenseGraphYearlyQuery__
 *
 * To run a query within a React component, call `useInvoiceAndExpenseGraphYearlyQuery` and pass it any options that fit your needs.
 * When your component renders, `useInvoiceAndExpenseGraphYearlyQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useInvoiceAndExpenseGraphYearlyQuery({
 *   variables: {
 *      businessId: // value for 'businessId'
 *      yearly: // value for 'yearly'
 *   },
 * });
 */
export function useInvoiceAndExpenseGraphYearlyQuery(baseOptions: Apollo.QueryHookOptions<InvoiceAndExpenseGraphYearlyQuery, InvoiceAndExpenseGraphYearlyQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<InvoiceAndExpenseGraphYearlyQuery, InvoiceAndExpenseGraphYearlyQueryVariables>(InvoiceAndExpenseGraphYearlyDocument, options);
      }
export function useInvoiceAndExpenseGraphYearlyLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<InvoiceAndExpenseGraphYearlyQuery, InvoiceAndExpenseGraphYearlyQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<InvoiceAndExpenseGraphYearlyQuery, InvoiceAndExpenseGraphYearlyQueryVariables>(InvoiceAndExpenseGraphYearlyDocument, options);
        }
export function useInvoiceAndExpenseGraphYearlySuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<InvoiceAndExpenseGraphYearlyQuery, InvoiceAndExpenseGraphYearlyQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<InvoiceAndExpenseGraphYearlyQuery, InvoiceAndExpenseGraphYearlyQueryVariables>(InvoiceAndExpenseGraphYearlyDocument, options);
        }
export type InvoiceAndExpenseGraphYearlyQueryHookResult = ReturnType<typeof useInvoiceAndExpenseGraphYearlyQuery>;
export type InvoiceAndExpenseGraphYearlyLazyQueryHookResult = ReturnType<typeof useInvoiceAndExpenseGraphYearlyLazyQuery>;
export type InvoiceAndExpenseGraphYearlySuspenseQueryHookResult = ReturnType<typeof useInvoiceAndExpenseGraphYearlySuspenseQuery>;
export type InvoiceAndExpenseGraphYearlyQueryResult = Apollo.QueryResult<InvoiceAndExpenseGraphYearlyQuery, InvoiceAndExpenseGraphYearlyQueryVariables>;
export const IsForgotPasswordLinkValidDocument = gql`
    query IsForgotPasswordLinkValid($forgotPasswordId: String!) {
  isForgotPasswordLinkValid(forgotPasswordId: $forgotPasswordId)
}
    `;

/**
 * __useIsForgotPasswordLinkValidQuery__
 *
 * To run a query within a React component, call `useIsForgotPasswordLinkValidQuery` and pass it any options that fit your needs.
 * When your component renders, `useIsForgotPasswordLinkValidQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useIsForgotPasswordLinkValidQuery({
 *   variables: {
 *      forgotPasswordId: // value for 'forgotPasswordId'
 *   },
 * });
 */
export function useIsForgotPasswordLinkValidQuery(baseOptions: Apollo.QueryHookOptions<IsForgotPasswordLinkValidQuery, IsForgotPasswordLinkValidQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<IsForgotPasswordLinkValidQuery, IsForgotPasswordLinkValidQueryVariables>(IsForgotPasswordLinkValidDocument, options);
      }
export function useIsForgotPasswordLinkValidLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<IsForgotPasswordLinkValidQuery, IsForgotPasswordLinkValidQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<IsForgotPasswordLinkValidQuery, IsForgotPasswordLinkValidQueryVariables>(IsForgotPasswordLinkValidDocument, options);
        }
export function useIsForgotPasswordLinkValidSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<IsForgotPasswordLinkValidQuery, IsForgotPasswordLinkValidQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<IsForgotPasswordLinkValidQuery, IsForgotPasswordLinkValidQueryVariables>(IsForgotPasswordLinkValidDocument, options);
        }
export type IsForgotPasswordLinkValidQueryHookResult = ReturnType<typeof useIsForgotPasswordLinkValidQuery>;
export type IsForgotPasswordLinkValidLazyQueryHookResult = ReturnType<typeof useIsForgotPasswordLinkValidLazyQuery>;
export type IsForgotPasswordLinkValidSuspenseQueryHookResult = ReturnType<typeof useIsForgotPasswordLinkValidSuspenseQuery>;
export type IsForgotPasswordLinkValidQueryResult = Apollo.QueryResult<IsForgotPasswordLinkValidQuery, IsForgotPasswordLinkValidQueryVariables>;
export const LogOutDocument = gql`
    mutation LogOut {
  logOut
}
    `;
export type LogOutMutationFn = Apollo.MutationFunction<LogOutMutation, LogOutMutationVariables>;

/**
 * __useLogOutMutation__
 *
 * To run a mutation, you first call `useLogOutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogOutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logOutMutation, { data, loading, error }] = useLogOutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogOutMutation(baseOptions?: Apollo.MutationHookOptions<LogOutMutation, LogOutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogOutMutation, LogOutMutationVariables>(LogOutDocument, options);
      }
export type LogOutMutationHookResult = ReturnType<typeof useLogOutMutation>;
export type LogOutMutationResult = Apollo.MutationResult<LogOutMutation>;
export type LogOutMutationOptions = Apollo.BaseMutationOptions<LogOutMutation, LogOutMutationVariables>;
export const MakeExpensePaymentDocument = gql`
    mutation MakeExpensePayment($businessId: String!, $expenseId: String!, $transactionDate: Date!, $description: String!, $total: Float!, $file: String) {
  makeExpensePayment(
    input: {businessId: $businessId, expenseId: $expenseId, transactionDate: $transactionDate, description: $description, total: $total, file: $file}
  ) {
    paid
    expenseStatus
  }
}
    `;
export type MakeExpensePaymentMutationFn = Apollo.MutationFunction<MakeExpensePaymentMutation, MakeExpensePaymentMutationVariables>;

/**
 * __useMakeExpensePaymentMutation__
 *
 * To run a mutation, you first call `useMakeExpensePaymentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMakeExpensePaymentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [makeExpensePaymentMutation, { data, loading, error }] = useMakeExpensePaymentMutation({
 *   variables: {
 *      businessId: // value for 'businessId'
 *      expenseId: // value for 'expenseId'
 *      transactionDate: // value for 'transactionDate'
 *      description: // value for 'description'
 *      total: // value for 'total'
 *      file: // value for 'file'
 *   },
 * });
 */
export function useMakeExpensePaymentMutation(baseOptions?: Apollo.MutationHookOptions<MakeExpensePaymentMutation, MakeExpensePaymentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MakeExpensePaymentMutation, MakeExpensePaymentMutationVariables>(MakeExpensePaymentDocument, options);
      }
export type MakeExpensePaymentMutationHookResult = ReturnType<typeof useMakeExpensePaymentMutation>;
export type MakeExpensePaymentMutationResult = Apollo.MutationResult<MakeExpensePaymentMutation>;
export type MakeExpensePaymentMutationOptions = Apollo.BaseMutationOptions<MakeExpensePaymentMutation, MakeExpensePaymentMutationVariables>;
export const MakePurchasePaymentDocument = gql`
    mutation MakePurchasePayment($businessId: String!, $purchaseId: String!, $transactionDate: Date!, $description: String!, $total: Float!, $file: String) {
  makePurchasePayment(
    input: {businessId: $businessId, purchaseId: $purchaseId, transactionDate: $transactionDate, description: $description, total: $total, file: $file}
  ) {
    paid
    purchaseStatus
  }
}
    `;
export type MakePurchasePaymentMutationFn = Apollo.MutationFunction<MakePurchasePaymentMutation, MakePurchasePaymentMutationVariables>;

/**
 * __useMakePurchasePaymentMutation__
 *
 * To run a mutation, you first call `useMakePurchasePaymentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMakePurchasePaymentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [makePurchasePaymentMutation, { data, loading, error }] = useMakePurchasePaymentMutation({
 *   variables: {
 *      businessId: // value for 'businessId'
 *      purchaseId: // value for 'purchaseId'
 *      transactionDate: // value for 'transactionDate'
 *      description: // value for 'description'
 *      total: // value for 'total'
 *      file: // value for 'file'
 *   },
 * });
 */
export function useMakePurchasePaymentMutation(baseOptions?: Apollo.MutationHookOptions<MakePurchasePaymentMutation, MakePurchasePaymentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MakePurchasePaymentMutation, MakePurchasePaymentMutationVariables>(MakePurchasePaymentDocument, options);
      }
export type MakePurchasePaymentMutationHookResult = ReturnType<typeof useMakePurchasePaymentMutation>;
export type MakePurchasePaymentMutationResult = Apollo.MutationResult<MakePurchasePaymentMutation>;
export type MakePurchasePaymentMutationOptions = Apollo.BaseMutationOptions<MakePurchasePaymentMutation, MakePurchasePaymentMutationVariables>;
export const MakeSalePaymentDocument = gql`
    mutation MakeSalePayment($saleId: String!, $transactionDate: Date!, $description: String!, $file: String) {
  makeSalePayment(
    input: {saleId: $saleId, transactionDate: $transactionDate, description: $description, file: $file}
  ) {
    paid
    saleStatus
  }
}
    `;
export type MakeSalePaymentMutationFn = Apollo.MutationFunction<MakeSalePaymentMutation, MakeSalePaymentMutationVariables>;

/**
 * __useMakeSalePaymentMutation__
 *
 * To run a mutation, you first call `useMakeSalePaymentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMakeSalePaymentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [makeSalePaymentMutation, { data, loading, error }] = useMakeSalePaymentMutation({
 *   variables: {
 *      saleId: // value for 'saleId'
 *      transactionDate: // value for 'transactionDate'
 *      description: // value for 'description'
 *      file: // value for 'file'
 *   },
 * });
 */
export function useMakeSalePaymentMutation(baseOptions?: Apollo.MutationHookOptions<MakeSalePaymentMutation, MakeSalePaymentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MakeSalePaymentMutation, MakeSalePaymentMutationVariables>(MakeSalePaymentDocument, options);
      }
export type MakeSalePaymentMutationHookResult = ReturnType<typeof useMakeSalePaymentMutation>;
export type MakeSalePaymentMutationResult = Apollo.MutationResult<MakeSalePaymentMutation>;
export type MakeSalePaymentMutationOptions = Apollo.BaseMutationOptions<MakeSalePaymentMutation, MakeSalePaymentMutationVariables>;
export const MarkExpenseItemAsReceivedDocument = gql`
    mutation MarkExpenseItemAsReceived($expenseItemId: String!, $businessId: String!, $quantity: Float!, $transactionDate: Date!) {
  markExpenseItemAsReceived(
    input: {businessId: $businessId, expenseItemId: $expenseItemId, quantity: $quantity, transactionDate: $transactionDate}
  ) {
    completed
    expenseStatus
  }
}
    `;
export type MarkExpenseItemAsReceivedMutationFn = Apollo.MutationFunction<MarkExpenseItemAsReceivedMutation, MarkExpenseItemAsReceivedMutationVariables>;

/**
 * __useMarkExpenseItemAsReceivedMutation__
 *
 * To run a mutation, you first call `useMarkExpenseItemAsReceivedMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMarkExpenseItemAsReceivedMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [markExpenseItemAsReceivedMutation, { data, loading, error }] = useMarkExpenseItemAsReceivedMutation({
 *   variables: {
 *      expenseItemId: // value for 'expenseItemId'
 *      businessId: // value for 'businessId'
 *      quantity: // value for 'quantity'
 *      transactionDate: // value for 'transactionDate'
 *   },
 * });
 */
export function useMarkExpenseItemAsReceivedMutation(baseOptions?: Apollo.MutationHookOptions<MarkExpenseItemAsReceivedMutation, MarkExpenseItemAsReceivedMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MarkExpenseItemAsReceivedMutation, MarkExpenseItemAsReceivedMutationVariables>(MarkExpenseItemAsReceivedDocument, options);
      }
export type MarkExpenseItemAsReceivedMutationHookResult = ReturnType<typeof useMarkExpenseItemAsReceivedMutation>;
export type MarkExpenseItemAsReceivedMutationResult = Apollo.MutationResult<MarkExpenseItemAsReceivedMutation>;
export type MarkExpenseItemAsReceivedMutationOptions = Apollo.BaseMutationOptions<MarkExpenseItemAsReceivedMutation, MarkExpenseItemAsReceivedMutationVariables>;
export const MarkPurchaseItemAsReceivedDocument = gql`
    mutation MarkPurchaseItemAsReceived($purchaseItemId: String!, $businessId: String!, $quantity: Float!, $transactionDate: Date!) {
  markPurchaseItemAsReceived(
    input: {businessId: $businessId, purchaseItemId: $purchaseItemId, quantity: $quantity, transactionDate: $transactionDate}
  ) {
    completed
    purchaseStatus
  }
}
    `;
export type MarkPurchaseItemAsReceivedMutationFn = Apollo.MutationFunction<MarkPurchaseItemAsReceivedMutation, MarkPurchaseItemAsReceivedMutationVariables>;

/**
 * __useMarkPurchaseItemAsReceivedMutation__
 *
 * To run a mutation, you first call `useMarkPurchaseItemAsReceivedMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMarkPurchaseItemAsReceivedMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [markPurchaseItemAsReceivedMutation, { data, loading, error }] = useMarkPurchaseItemAsReceivedMutation({
 *   variables: {
 *      purchaseItemId: // value for 'purchaseItemId'
 *      businessId: // value for 'businessId'
 *      quantity: // value for 'quantity'
 *      transactionDate: // value for 'transactionDate'
 *   },
 * });
 */
export function useMarkPurchaseItemAsReceivedMutation(baseOptions?: Apollo.MutationHookOptions<MarkPurchaseItemAsReceivedMutation, MarkPurchaseItemAsReceivedMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MarkPurchaseItemAsReceivedMutation, MarkPurchaseItemAsReceivedMutationVariables>(MarkPurchaseItemAsReceivedDocument, options);
      }
export type MarkPurchaseItemAsReceivedMutationHookResult = ReturnType<typeof useMarkPurchaseItemAsReceivedMutation>;
export type MarkPurchaseItemAsReceivedMutationResult = Apollo.MutationResult<MarkPurchaseItemAsReceivedMutation>;
export type MarkPurchaseItemAsReceivedMutationOptions = Apollo.BaseMutationOptions<MarkPurchaseItemAsReceivedMutation, MarkPurchaseItemAsReceivedMutationVariables>;
export const MarkSaleAsDeliveredDocument = gql`
    mutation MarkSaleAsDelivered($saleId: String!) {
  markSaleAsDelivered(saleId: $saleId) {
    delivered
    saleStatus
  }
}
    `;
export type MarkSaleAsDeliveredMutationFn = Apollo.MutationFunction<MarkSaleAsDeliveredMutation, MarkSaleAsDeliveredMutationVariables>;

/**
 * __useMarkSaleAsDeliveredMutation__
 *
 * To run a mutation, you first call `useMarkSaleAsDeliveredMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMarkSaleAsDeliveredMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [markSaleAsDeliveredMutation, { data, loading, error }] = useMarkSaleAsDeliveredMutation({
 *   variables: {
 *      saleId: // value for 'saleId'
 *   },
 * });
 */
export function useMarkSaleAsDeliveredMutation(baseOptions?: Apollo.MutationHookOptions<MarkSaleAsDeliveredMutation, MarkSaleAsDeliveredMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MarkSaleAsDeliveredMutation, MarkSaleAsDeliveredMutationVariables>(MarkSaleAsDeliveredDocument, options);
      }
export type MarkSaleAsDeliveredMutationHookResult = ReturnType<typeof useMarkSaleAsDeliveredMutation>;
export type MarkSaleAsDeliveredMutationResult = Apollo.MutationResult<MarkSaleAsDeliveredMutation>;
export type MarkSaleAsDeliveredMutationOptions = Apollo.BaseMutationOptions<MarkSaleAsDeliveredMutation, MarkSaleAsDeliveredMutationVariables>;
export const RefreshTokenDocument = gql`
    mutation RefreshToken {
  refreshToken {
    access_token
    refresh_token
  }
}
    `;
export type RefreshTokenMutationFn = Apollo.MutationFunction<RefreshTokenMutation, RefreshTokenMutationVariables>;

/**
 * __useRefreshTokenMutation__
 *
 * To run a mutation, you first call `useRefreshTokenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRefreshTokenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [refreshTokenMutation, { data, loading, error }] = useRefreshTokenMutation({
 *   variables: {
 *   },
 * });
 */
export function useRefreshTokenMutation(baseOptions?: Apollo.MutationHookOptions<RefreshTokenMutation, RefreshTokenMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RefreshTokenMutation, RefreshTokenMutationVariables>(RefreshTokenDocument, options);
      }
export type RefreshTokenMutationHookResult = ReturnType<typeof useRefreshTokenMutation>;
export type RefreshTokenMutationResult = Apollo.MutationResult<RefreshTokenMutation>;
export type RefreshTokenMutationOptions = Apollo.BaseMutationOptions<RefreshTokenMutation, RefreshTokenMutationVariables>;
export const ResendVerificationDocument = gql`
    mutation ResendVerification {
  resendVerification
}
    `;
export type ResendVerificationMutationFn = Apollo.MutationFunction<ResendVerificationMutation, ResendVerificationMutationVariables>;

/**
 * __useResendVerificationMutation__
 *
 * To run a mutation, you first call `useResendVerificationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResendVerificationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resendVerificationMutation, { data, loading, error }] = useResendVerificationMutation({
 *   variables: {
 *   },
 * });
 */
export function useResendVerificationMutation(baseOptions?: Apollo.MutationHookOptions<ResendVerificationMutation, ResendVerificationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ResendVerificationMutation, ResendVerificationMutationVariables>(ResendVerificationDocument, options);
      }
export type ResendVerificationMutationHookResult = ReturnType<typeof useResendVerificationMutation>;
export type ResendVerificationMutationResult = Apollo.MutationResult<ResendVerificationMutation>;
export type ResendVerificationMutationOptions = Apollo.BaseMutationOptions<ResendVerificationMutation, ResendVerificationMutationVariables>;
export const SearchCustomerByBusinessDocument = gql`
    query SearchCustomerByBusiness($businessId: String!, $search: String!) {
  searchCustomerByBusiness(businessId: $businessId, search: $search) {
    id
    name
    mobile
    email
    address
  }
}
    `;

/**
 * __useSearchCustomerByBusinessQuery__
 *
 * To run a query within a React component, call `useSearchCustomerByBusinessQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchCustomerByBusinessQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchCustomerByBusinessQuery({
 *   variables: {
 *      businessId: // value for 'businessId'
 *      search: // value for 'search'
 *   },
 * });
 */
export function useSearchCustomerByBusinessQuery(baseOptions: Apollo.QueryHookOptions<SearchCustomerByBusinessQuery, SearchCustomerByBusinessQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchCustomerByBusinessQuery, SearchCustomerByBusinessQueryVariables>(SearchCustomerByBusinessDocument, options);
      }
export function useSearchCustomerByBusinessLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchCustomerByBusinessQuery, SearchCustomerByBusinessQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchCustomerByBusinessQuery, SearchCustomerByBusinessQueryVariables>(SearchCustomerByBusinessDocument, options);
        }
export function useSearchCustomerByBusinessSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<SearchCustomerByBusinessQuery, SearchCustomerByBusinessQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<SearchCustomerByBusinessQuery, SearchCustomerByBusinessQueryVariables>(SearchCustomerByBusinessDocument, options);
        }
export type SearchCustomerByBusinessQueryHookResult = ReturnType<typeof useSearchCustomerByBusinessQuery>;
export type SearchCustomerByBusinessLazyQueryHookResult = ReturnType<typeof useSearchCustomerByBusinessLazyQuery>;
export type SearchCustomerByBusinessSuspenseQueryHookResult = ReturnType<typeof useSearchCustomerByBusinessSuspenseQuery>;
export type SearchCustomerByBusinessQueryResult = Apollo.QueryResult<SearchCustomerByBusinessQuery, SearchCustomerByBusinessQueryVariables>;
export const SearchProductOrServiceByBusinessDocument = gql`
    query SearchProductOrServiceByBusiness($businessId: String!, $search: String!) {
  searchProductOrServiceByBusiness(businessId: $businessId, search: $search) {
    id
    type
    title
    product {
      id
      productName
      price
      isArchived
      createdAt
    }
    service {
      id
      name
      price
      isArchived
      createdAt
    }
  }
}
    `;

/**
 * __useSearchProductOrServiceByBusinessQuery__
 *
 * To run a query within a React component, call `useSearchProductOrServiceByBusinessQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchProductOrServiceByBusinessQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchProductOrServiceByBusinessQuery({
 *   variables: {
 *      businessId: // value for 'businessId'
 *      search: // value for 'search'
 *   },
 * });
 */
export function useSearchProductOrServiceByBusinessQuery(baseOptions: Apollo.QueryHookOptions<SearchProductOrServiceByBusinessQuery, SearchProductOrServiceByBusinessQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchProductOrServiceByBusinessQuery, SearchProductOrServiceByBusinessQueryVariables>(SearchProductOrServiceByBusinessDocument, options);
      }
export function useSearchProductOrServiceByBusinessLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchProductOrServiceByBusinessQuery, SearchProductOrServiceByBusinessQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchProductOrServiceByBusinessQuery, SearchProductOrServiceByBusinessQueryVariables>(SearchProductOrServiceByBusinessDocument, options);
        }
export function useSearchProductOrServiceByBusinessSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<SearchProductOrServiceByBusinessQuery, SearchProductOrServiceByBusinessQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<SearchProductOrServiceByBusinessQuery, SearchProductOrServiceByBusinessQueryVariables>(SearchProductOrServiceByBusinessDocument, options);
        }
export type SearchProductOrServiceByBusinessQueryHookResult = ReturnType<typeof useSearchProductOrServiceByBusinessQuery>;
export type SearchProductOrServiceByBusinessLazyQueryHookResult = ReturnType<typeof useSearchProductOrServiceByBusinessLazyQuery>;
export type SearchProductOrServiceByBusinessSuspenseQueryHookResult = ReturnType<typeof useSearchProductOrServiceByBusinessSuspenseQuery>;
export type SearchProductOrServiceByBusinessQueryResult = Apollo.QueryResult<SearchProductOrServiceByBusinessQuery, SearchProductOrServiceByBusinessQueryVariables>;
export const SendInvoiceBDocument = gql`
    mutation SendInvoiceB($invoiceId: String!, $copy: Boolean) {
  sendInvoiceB(invoiceId: $invoiceId, copy: $copy)
}
    `;
export type SendInvoiceBMutationFn = Apollo.MutationFunction<SendInvoiceBMutation, SendInvoiceBMutationVariables>;

/**
 * __useSendInvoiceBMutation__
 *
 * To run a mutation, you first call `useSendInvoiceBMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendInvoiceBMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendInvoiceBMutation, { data, loading, error }] = useSendInvoiceBMutation({
 *   variables: {
 *      invoiceId: // value for 'invoiceId'
 *      copy: // value for 'copy'
 *   },
 * });
 */
export function useSendInvoiceBMutation(baseOptions?: Apollo.MutationHookOptions<SendInvoiceBMutation, SendInvoiceBMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SendInvoiceBMutation, SendInvoiceBMutationVariables>(SendInvoiceBDocument, options);
      }
export type SendInvoiceBMutationHookResult = ReturnType<typeof useSendInvoiceBMutation>;
export type SendInvoiceBMutationResult = Apollo.MutationResult<SendInvoiceBMutation>;
export type SendInvoiceBMutationOptions = Apollo.BaseMutationOptions<SendInvoiceBMutation, SendInvoiceBMutationVariables>;
export const SendPurchaseDocument = gql`
    mutation SendPurchase($purchaseId: String!, $copy: Boolean) {
  sendPurchase(purchaseId: $purchaseId, copy: $copy)
}
    `;
export type SendPurchaseMutationFn = Apollo.MutationFunction<SendPurchaseMutation, SendPurchaseMutationVariables>;

/**
 * __useSendPurchaseMutation__
 *
 * To run a mutation, you first call `useSendPurchaseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendPurchaseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendPurchaseMutation, { data, loading, error }] = useSendPurchaseMutation({
 *   variables: {
 *      purchaseId: // value for 'purchaseId'
 *      copy: // value for 'copy'
 *   },
 * });
 */
export function useSendPurchaseMutation(baseOptions?: Apollo.MutationHookOptions<SendPurchaseMutation, SendPurchaseMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SendPurchaseMutation, SendPurchaseMutationVariables>(SendPurchaseDocument, options);
      }
export type SendPurchaseMutationHookResult = ReturnType<typeof useSendPurchaseMutation>;
export type SendPurchaseMutationResult = Apollo.MutationResult<SendPurchaseMutation>;
export type SendPurchaseMutationOptions = Apollo.BaseMutationOptions<SendPurchaseMutation, SendPurchaseMutationVariables>;
export const SignInDocument = gql`
    mutation SignIn($email: String!, $password: String!) {
  signIn(input: {email: $email, password: $password}) {
    verified
    token {
      access_token
      refresh_token
    }
  }
}
    `;
export type SignInMutationFn = Apollo.MutationFunction<SignInMutation, SignInMutationVariables>;

/**
 * __useSignInMutation__
 *
 * To run a mutation, you first call `useSignInMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignInMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signInMutation, { data, loading, error }] = useSignInMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useSignInMutation(baseOptions?: Apollo.MutationHookOptions<SignInMutation, SignInMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignInMutation, SignInMutationVariables>(SignInDocument, options);
      }
export type SignInMutationHookResult = ReturnType<typeof useSignInMutation>;
export type SignInMutationResult = Apollo.MutationResult<SignInMutation>;
export type SignInMutationOptions = Apollo.BaseMutationOptions<SignInMutation, SignInMutationVariables>;
export const SignUpDocument = gql`
    mutation SignUp($fullname: String!, $email: String!, $password: String!) {
  signUp(input: {email: $email, password: $password, fullname: $fullname}) {
    access_token
    refresh_token
  }
}
    `;
export type SignUpMutationFn = Apollo.MutationFunction<SignUpMutation, SignUpMutationVariables>;

/**
 * __useSignUpMutation__
 *
 * To run a mutation, you first call `useSignUpMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignUpMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signUpMutation, { data, loading, error }] = useSignUpMutation({
 *   variables: {
 *      fullname: // value for 'fullname'
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useSignUpMutation(baseOptions?: Apollo.MutationHookOptions<SignUpMutation, SignUpMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignUpMutation, SignUpMutationVariables>(SignUpDocument, options);
      }
export type SignUpMutationHookResult = ReturnType<typeof useSignUpMutation>;
export type SignUpMutationResult = Apollo.MutationResult<SignUpMutation>;
export type SignUpMutationOptions = Apollo.BaseMutationOptions<SignUpMutation, SignUpMutationVariables>;
export const UpdateAddOnOptionDocument = gql`
    mutation UpdateAddOnOption($addOnOptionId: String!, $addOnName: String, $addOnPrice: Float) {
  updateAddOnOption(
    addOnOptionId: $addOnOptionId
    input: {addOnName: $addOnName, addOnPrice: $addOnPrice}
  ) {
    id
    addOnName
    addOnPrice
    updatedAt
  }
}
    `;
export type UpdateAddOnOptionMutationFn = Apollo.MutationFunction<UpdateAddOnOptionMutation, UpdateAddOnOptionMutationVariables>;

/**
 * __useUpdateAddOnOptionMutation__
 *
 * To run a mutation, you first call `useUpdateAddOnOptionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateAddOnOptionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateAddOnOptionMutation, { data, loading, error }] = useUpdateAddOnOptionMutation({
 *   variables: {
 *      addOnOptionId: // value for 'addOnOptionId'
 *      addOnName: // value for 'addOnName'
 *      addOnPrice: // value for 'addOnPrice'
 *   },
 * });
 */
export function useUpdateAddOnOptionMutation(baseOptions?: Apollo.MutationHookOptions<UpdateAddOnOptionMutation, UpdateAddOnOptionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateAddOnOptionMutation, UpdateAddOnOptionMutationVariables>(UpdateAddOnOptionDocument, options);
      }
export type UpdateAddOnOptionMutationHookResult = ReturnType<typeof useUpdateAddOnOptionMutation>;
export type UpdateAddOnOptionMutationResult = Apollo.MutationResult<UpdateAddOnOptionMutation>;
export type UpdateAddOnOptionMutationOptions = Apollo.BaseMutationOptions<UpdateAddOnOptionMutation, UpdateAddOnOptionMutationVariables>;
export const UpdateBusinessDocument = gql`
    mutation UpdateBusiness($businessId: String!, $businessName: String, $businessEmail: String, $businessMobile: String, $businessCategoryId: String) {
  updateBusiness(
    businessId: $businessId
    input: {businessName: $businessName, businessEmail: $businessEmail, businessMobile: $businessMobile, businessCategoryId: $businessCategoryId}
  ) {
    id
    businessName
    businessEmail
    businessMobile
    businessCategoryId
  }
}
    `;
export type UpdateBusinessMutationFn = Apollo.MutationFunction<UpdateBusinessMutation, UpdateBusinessMutationVariables>;

/**
 * __useUpdateBusinessMutation__
 *
 * To run a mutation, you first call `useUpdateBusinessMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateBusinessMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateBusinessMutation, { data, loading, error }] = useUpdateBusinessMutation({
 *   variables: {
 *      businessId: // value for 'businessId'
 *      businessName: // value for 'businessName'
 *      businessEmail: // value for 'businessEmail'
 *      businessMobile: // value for 'businessMobile'
 *      businessCategoryId: // value for 'businessCategoryId'
 *   },
 * });
 */
export function useUpdateBusinessMutation(baseOptions?: Apollo.MutationHookOptions<UpdateBusinessMutation, UpdateBusinessMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateBusinessMutation, UpdateBusinessMutationVariables>(UpdateBusinessDocument, options);
      }
export type UpdateBusinessMutationHookResult = ReturnType<typeof useUpdateBusinessMutation>;
export type UpdateBusinessMutationResult = Apollo.MutationResult<UpdateBusinessMutation>;
export type UpdateBusinessMutationOptions = Apollo.BaseMutationOptions<UpdateBusinessMutation, UpdateBusinessMutationVariables>;
export const UpdateBusinessCoaDocument = gql`
    mutation UpdateBusinessCOA($businessCoaId: String!, $code: String, $name: String, $description: String, $accountCategoryTypeId: String) {
  updateBusinessCOA(
    businessCoaId: $businessCoaId
    input: {code: $code, name: $name, description: $description, accountCategoryTypeId: $accountCategoryTypeId}
  ) {
    id
    code
    name
    createdAt
    updatedAt
  }
}
    `;
export type UpdateBusinessCoaMutationFn = Apollo.MutationFunction<UpdateBusinessCoaMutation, UpdateBusinessCoaMutationVariables>;

/**
 * __useUpdateBusinessCoaMutation__
 *
 * To run a mutation, you first call `useUpdateBusinessCoaMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateBusinessCoaMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateBusinessCoaMutation, { data, loading, error }] = useUpdateBusinessCoaMutation({
 *   variables: {
 *      businessCoaId: // value for 'businessCoaId'
 *      code: // value for 'code'
 *      name: // value for 'name'
 *      description: // value for 'description'
 *      accountCategoryTypeId: // value for 'accountCategoryTypeId'
 *   },
 * });
 */
export function useUpdateBusinessCoaMutation(baseOptions?: Apollo.MutationHookOptions<UpdateBusinessCoaMutation, UpdateBusinessCoaMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateBusinessCoaMutation, UpdateBusinessCoaMutationVariables>(UpdateBusinessCoaDocument, options);
      }
export type UpdateBusinessCoaMutationHookResult = ReturnType<typeof useUpdateBusinessCoaMutation>;
export type UpdateBusinessCoaMutationResult = Apollo.MutationResult<UpdateBusinessCoaMutation>;
export type UpdateBusinessCoaMutationOptions = Apollo.BaseMutationOptions<UpdateBusinessCoaMutation, UpdateBusinessCoaMutationVariables>;
export const UpdateCustomerDocument = gql`
    mutation UpdateCustomer($customerId: String!, $name: String, $address: String, $mobile: String, $email: String, $isArchived: Boolean) {
  updateCustomer(
    customerId: $customerId
    input: {name: $name, address: $address, mobile: $mobile, email: $email, isArchived: $isArchived}
  ) {
    id
    name
    address
    mobile
    email
    businessId
    createdAt
    updatedAt
  }
}
    `;
export type UpdateCustomerMutationFn = Apollo.MutationFunction<UpdateCustomerMutation, UpdateCustomerMutationVariables>;

/**
 * __useUpdateCustomerMutation__
 *
 * To run a mutation, you first call `useUpdateCustomerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCustomerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCustomerMutation, { data, loading, error }] = useUpdateCustomerMutation({
 *   variables: {
 *      customerId: // value for 'customerId'
 *      name: // value for 'name'
 *      address: // value for 'address'
 *      mobile: // value for 'mobile'
 *      email: // value for 'email'
 *      isArchived: // value for 'isArchived'
 *   },
 * });
 */
export function useUpdateCustomerMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCustomerMutation, UpdateCustomerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCustomerMutation, UpdateCustomerMutationVariables>(UpdateCustomerDocument, options);
      }
export type UpdateCustomerMutationHookResult = ReturnType<typeof useUpdateCustomerMutation>;
export type UpdateCustomerMutationResult = Apollo.MutationResult<UpdateCustomerMutation>;
export type UpdateCustomerMutationOptions = Apollo.BaseMutationOptions<UpdateCustomerMutation, UpdateCustomerMutationVariables>;
export const UpdateExpenseDocument = gql`
    mutation UpdateExpense($expenseId: String!, $description: String, $expenseCategoryId: String, $expenseDate: Date, $merchantId: String, $expenseItem: [ExpenseDetail]) {
  updateExpense(
    expenseId: $expenseId
    input: {description: $description, expenseCategoryId: $expenseCategoryId, expenseDate: $expenseDate, merchantId: $merchantId, expenseItem: $expenseItem}
  ) {
    id
    description
    amount
    expenseDate
    createdAt
  }
}
    `;
export type UpdateExpenseMutationFn = Apollo.MutationFunction<UpdateExpenseMutation, UpdateExpenseMutationVariables>;

/**
 * __useUpdateExpenseMutation__
 *
 * To run a mutation, you first call `useUpdateExpenseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateExpenseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateExpenseMutation, { data, loading, error }] = useUpdateExpenseMutation({
 *   variables: {
 *      expenseId: // value for 'expenseId'
 *      description: // value for 'description'
 *      expenseCategoryId: // value for 'expenseCategoryId'
 *      expenseDate: // value for 'expenseDate'
 *      merchantId: // value for 'merchantId'
 *      expenseItem: // value for 'expenseItem'
 *   },
 * });
 */
export function useUpdateExpenseMutation(baseOptions?: Apollo.MutationHookOptions<UpdateExpenseMutation, UpdateExpenseMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateExpenseMutation, UpdateExpenseMutationVariables>(UpdateExpenseDocument, options);
      }
export type UpdateExpenseMutationHookResult = ReturnType<typeof useUpdateExpenseMutation>;
export type UpdateExpenseMutationResult = Apollo.MutationResult<UpdateExpenseMutation>;
export type UpdateExpenseMutationOptions = Apollo.BaseMutationOptions<UpdateExpenseMutation, UpdateExpenseMutationVariables>;
export const UpdateProductDocument = gql`
    mutation UpdateProduct($productId: String!, $productName: String, $price: Float, $productUnitId: String, $trackReorderLevel: Boolean, $reorderLevel: Float) {
  updateProduct(
    productId: $productId
    input: {productName: $productName, price: $price, productUnitId: $productUnitId, trackReorderLevel: $trackReorderLevel, reorderLevel: $reorderLevel}
  ) {
    id
    productName
    price
    productUnitId
  }
}
    `;
export type UpdateProductMutationFn = Apollo.MutationFunction<UpdateProductMutation, UpdateProductMutationVariables>;

/**
 * __useUpdateProductMutation__
 *
 * To run a mutation, you first call `useUpdateProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProductMutation, { data, loading, error }] = useUpdateProductMutation({
 *   variables: {
 *      productId: // value for 'productId'
 *      productName: // value for 'productName'
 *      price: // value for 'price'
 *      productUnitId: // value for 'productUnitId'
 *      trackReorderLevel: // value for 'trackReorderLevel'
 *      reorderLevel: // value for 'reorderLevel'
 *   },
 * });
 */
export function useUpdateProductMutation(baseOptions?: Apollo.MutationHookOptions<UpdateProductMutation, UpdateProductMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateProductMutation, UpdateProductMutationVariables>(UpdateProductDocument, options);
      }
export type UpdateProductMutationHookResult = ReturnType<typeof useUpdateProductMutation>;
export type UpdateProductMutationResult = Apollo.MutationResult<UpdateProductMutation>;
export type UpdateProductMutationOptions = Apollo.BaseMutationOptions<UpdateProductMutation, UpdateProductMutationVariables>;
export const UpdatePurchaseDocument = gql`
    mutation UpdatePurchase($purchaseId: String!, $transactionDate: Date, $description: String, $merchantId: String, $purchaseItem: [PurchaseItemDetail!]) {
  updatePurchaseEntry(
    purchaseId: $purchaseId
    input: {transactionDate: $transactionDate, description: $description, merchantId: $merchantId, purchaseItem: $purchaseItem}
  ) {
    id
    description
    transactionDate
    total
    businessId
  }
}
    `;
export type UpdatePurchaseMutationFn = Apollo.MutationFunction<UpdatePurchaseMutation, UpdatePurchaseMutationVariables>;

/**
 * __useUpdatePurchaseMutation__
 *
 * To run a mutation, you first call `useUpdatePurchaseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePurchaseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePurchaseMutation, { data, loading, error }] = useUpdatePurchaseMutation({
 *   variables: {
 *      purchaseId: // value for 'purchaseId'
 *      transactionDate: // value for 'transactionDate'
 *      description: // value for 'description'
 *      merchantId: // value for 'merchantId'
 *      purchaseItem: // value for 'purchaseItem'
 *   },
 * });
 */
export function useUpdatePurchaseMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePurchaseMutation, UpdatePurchaseMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdatePurchaseMutation, UpdatePurchaseMutationVariables>(UpdatePurchaseDocument, options);
      }
export type UpdatePurchaseMutationHookResult = ReturnType<typeof useUpdatePurchaseMutation>;
export type UpdatePurchaseMutationResult = Apollo.MutationResult<UpdatePurchaseMutation>;
export type UpdatePurchaseMutationOptions = Apollo.BaseMutationOptions<UpdatePurchaseMutation, UpdatePurchaseMutationVariables>;
export const UpdateSaleDocument = gql`
    mutation UpdateSale($saleId: String!, $updateInvoiceInput: UpdateCompleteInvoiceB!, $description: String, $saleExpense: [SaleExpenseItem!], $saleServiceExpense: [SaleServiceExpenseEntry!]) {
  updateSaleEntry(
    saleId: $saleId
    input: {updateInvoiceInput: $updateInvoiceInput, description: $description, saleExpense: $saleExpense, saleServiceExpense: $saleServiceExpense}
  ) {
    id
    description
    saleAmount
    transactionDate
    invoice {
      id
      subtotal
      totalAmount
    }
  }
}
    `;
export type UpdateSaleMutationFn = Apollo.MutationFunction<UpdateSaleMutation, UpdateSaleMutationVariables>;

/**
 * __useUpdateSaleMutation__
 *
 * To run a mutation, you first call `useUpdateSaleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateSaleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateSaleMutation, { data, loading, error }] = useUpdateSaleMutation({
 *   variables: {
 *      saleId: // value for 'saleId'
 *      updateInvoiceInput: // value for 'updateInvoiceInput'
 *      description: // value for 'description'
 *      saleExpense: // value for 'saleExpense'
 *      saleServiceExpense: // value for 'saleServiceExpense'
 *   },
 * });
 */
export function useUpdateSaleMutation(baseOptions?: Apollo.MutationHookOptions<UpdateSaleMutation, UpdateSaleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateSaleMutation, UpdateSaleMutationVariables>(UpdateSaleDocument, options);
      }
export type UpdateSaleMutationHookResult = ReturnType<typeof useUpdateSaleMutation>;
export type UpdateSaleMutationResult = Apollo.MutationResult<UpdateSaleMutation>;
export type UpdateSaleMutationOptions = Apollo.BaseMutationOptions<UpdateSaleMutation, UpdateSaleMutationVariables>;
export const UpdateServiceDocument = gql`
    mutation UpdateService($serviceId: String!, $name: String, $price: Float, $serviceUnitId: String) {
  updateService(
    serviceId: $serviceId
    input: {name: $name, price: $price, serviceUnitId: $serviceUnitId}
  ) {
    id
    name
    price
    serviceUnitId
  }
}
    `;
export type UpdateServiceMutationFn = Apollo.MutationFunction<UpdateServiceMutation, UpdateServiceMutationVariables>;

/**
 * __useUpdateServiceMutation__
 *
 * To run a mutation, you first call `useUpdateServiceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateServiceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateServiceMutation, { data, loading, error }] = useUpdateServiceMutation({
 *   variables: {
 *      serviceId: // value for 'serviceId'
 *      name: // value for 'name'
 *      price: // value for 'price'
 *      serviceUnitId: // value for 'serviceUnitId'
 *   },
 * });
 */
export function useUpdateServiceMutation(baseOptions?: Apollo.MutationHookOptions<UpdateServiceMutation, UpdateServiceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateServiceMutation, UpdateServiceMutationVariables>(UpdateServiceDocument, options);
      }
export type UpdateServiceMutationHookResult = ReturnType<typeof useUpdateServiceMutation>;
export type UpdateServiceMutationResult = Apollo.MutationResult<UpdateServiceMutation>;
export type UpdateServiceMutationOptions = Apollo.BaseMutationOptions<UpdateServiceMutation, UpdateServiceMutationVariables>;
export const UpdateUserDocument = gql`
    mutation UpdateUser($fullname: String, $oldPassword: String, $newPassword: String) {
  updateUser(
    input: {fullname: $fullname, oldPassword: $oldPassword, newPassword: $newPassword}
  ) {
    id
    fullname
    email
  }
}
    `;
export type UpdateUserMutationFn = Apollo.MutationFunction<UpdateUserMutation, UpdateUserMutationVariables>;

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      fullname: // value for 'fullname'
 *      oldPassword: // value for 'oldPassword'
 *      newPassword: // value for 'newPassword'
 *   },
 * });
 */
export function useUpdateUserMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserMutation, UpdateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, options);
      }
export type UpdateUserMutationHookResult = ReturnType<typeof useUpdateUserMutation>;
export type UpdateUserMutationResult = Apollo.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<UpdateUserMutation, UpdateUserMutationVariables>;
export const UploadMerchantInvoiceDocument = gql`
    mutation UploadMerchantInvoice($businessId: String!, $expenseId: String!, $invoiceDate: Date!, $match: Boolean!, $file: String) {
  uploadMerchantInvoiceToExpense(
    input: {businessId: $businessId, expenseId: $expenseId, invoiceDate: $invoiceDate, match: $match, file: $file}
  ) {
    uploaded
    expenseStatus
  }
}
    `;
export type UploadMerchantInvoiceMutationFn = Apollo.MutationFunction<UploadMerchantInvoiceMutation, UploadMerchantInvoiceMutationVariables>;

/**
 * __useUploadMerchantInvoiceMutation__
 *
 * To run a mutation, you first call `useUploadMerchantInvoiceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUploadMerchantInvoiceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [uploadMerchantInvoiceMutation, { data, loading, error }] = useUploadMerchantInvoiceMutation({
 *   variables: {
 *      businessId: // value for 'businessId'
 *      expenseId: // value for 'expenseId'
 *      invoiceDate: // value for 'invoiceDate'
 *      match: // value for 'match'
 *      file: // value for 'file'
 *   },
 * });
 */
export function useUploadMerchantInvoiceMutation(baseOptions?: Apollo.MutationHookOptions<UploadMerchantInvoiceMutation, UploadMerchantInvoiceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UploadMerchantInvoiceMutation, UploadMerchantInvoiceMutationVariables>(UploadMerchantInvoiceDocument, options);
      }
export type UploadMerchantInvoiceMutationHookResult = ReturnType<typeof useUploadMerchantInvoiceMutation>;
export type UploadMerchantInvoiceMutationResult = Apollo.MutationResult<UploadMerchantInvoiceMutation>;
export type UploadMerchantInvoiceMutationOptions = Apollo.BaseMutationOptions<UploadMerchantInvoiceMutation, UploadMerchantInvoiceMutationVariables>;
export const UploadMerchantInvoiceToPurchaseDocument = gql`
    mutation UploadMerchantInvoiceToPurchase($businessId: String!, $purchaseId: String!, $invoiceDate: Date!, $match: Boolean!, $file: String) {
  uploadMerchantInvoiceToPurchase(
    input: {businessId: $businessId, purchaseId: $purchaseId, invoiceDate: $invoiceDate, match: $match, file: $file}
  ) {
    uploaded
    purchaseStatus
  }
}
    `;
export type UploadMerchantInvoiceToPurchaseMutationFn = Apollo.MutationFunction<UploadMerchantInvoiceToPurchaseMutation, UploadMerchantInvoiceToPurchaseMutationVariables>;

/**
 * __useUploadMerchantInvoiceToPurchaseMutation__
 *
 * To run a mutation, you first call `useUploadMerchantInvoiceToPurchaseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUploadMerchantInvoiceToPurchaseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [uploadMerchantInvoiceToPurchaseMutation, { data, loading, error }] = useUploadMerchantInvoiceToPurchaseMutation({
 *   variables: {
 *      businessId: // value for 'businessId'
 *      purchaseId: // value for 'purchaseId'
 *      invoiceDate: // value for 'invoiceDate'
 *      match: // value for 'match'
 *      file: // value for 'file'
 *   },
 * });
 */
export function useUploadMerchantInvoiceToPurchaseMutation(baseOptions?: Apollo.MutationHookOptions<UploadMerchantInvoiceToPurchaseMutation, UploadMerchantInvoiceToPurchaseMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UploadMerchantInvoiceToPurchaseMutation, UploadMerchantInvoiceToPurchaseMutationVariables>(UploadMerchantInvoiceToPurchaseDocument, options);
      }
export type UploadMerchantInvoiceToPurchaseMutationHookResult = ReturnType<typeof useUploadMerchantInvoiceToPurchaseMutation>;
export type UploadMerchantInvoiceToPurchaseMutationResult = Apollo.MutationResult<UploadMerchantInvoiceToPurchaseMutation>;
export type UploadMerchantInvoiceToPurchaseMutationOptions = Apollo.BaseMutationOptions<UploadMerchantInvoiceToPurchaseMutation, UploadMerchantInvoiceToPurchaseMutationVariables>;
export const VerificationWithEmailLinkDocument = gql`
    mutation VerificationWithEmailLink($userIdFromEmail: String!) {
  verificationWithEmailLink(userIdFromEmail: $userIdFromEmail)
}
    `;
export type VerificationWithEmailLinkMutationFn = Apollo.MutationFunction<VerificationWithEmailLinkMutation, VerificationWithEmailLinkMutationVariables>;

/**
 * __useVerificationWithEmailLinkMutation__
 *
 * To run a mutation, you first call `useVerificationWithEmailLinkMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVerificationWithEmailLinkMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [verificationWithEmailLinkMutation, { data, loading, error }] = useVerificationWithEmailLinkMutation({
 *   variables: {
 *      userIdFromEmail: // value for 'userIdFromEmail'
 *   },
 * });
 */
export function useVerificationWithEmailLinkMutation(baseOptions?: Apollo.MutationHookOptions<VerificationWithEmailLinkMutation, VerificationWithEmailLinkMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<VerificationWithEmailLinkMutation, VerificationWithEmailLinkMutationVariables>(VerificationWithEmailLinkDocument, options);
      }
export type VerificationWithEmailLinkMutationHookResult = ReturnType<typeof useVerificationWithEmailLinkMutation>;
export type VerificationWithEmailLinkMutationResult = Apollo.MutationResult<VerificationWithEmailLinkMutation>;
export type VerificationWithEmailLinkMutationOptions = Apollo.BaseMutationOptions<VerificationWithEmailLinkMutation, VerificationWithEmailLinkMutationVariables>;