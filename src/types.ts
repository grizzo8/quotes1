/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type ServiceNiche = 'Landscaping' | 'Plumbing' | 'House Cleaning' | 'Interior Painting';
export type BrandColor = 'Blue' | 'Red' | 'Green' | 'Orange' | 'Black';

export interface ClientData {
  businessName: string;
  niche: ServiceNiche;
  brandColor: BrandColor;
  phoneNumber: string;
}

export type AppView = 'admin' | 'live';
