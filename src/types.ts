export interface JsonObject {
  [key: string]: JsonValue;
}

export type JsonArray = JsonValue[];

export type JsonValue =
  | null
  | boolean
  | number
  | string
  | JsonArray
  | JsonObject
  ;

export interface Link {  
	readonly rel: LinkRelation;
	readonly href: string;
	readonly hreflang?: string;
	readonly media?: string;
	readonly title?: string;
	readonly type?: string;
	readonly deprecation?: string;
	readonly profile?: string;
	readonly name?: string;
}

export type LinkRelation = string;
