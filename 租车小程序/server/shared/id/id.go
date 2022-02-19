package id


// AccountID defines account id object
type AccountID string

func(a AccountID)String()string{
	return string(a)
}

// TripID defines trip id object
type TripID string

func(a TripID)String()string{
	return string(a)
}

// IdentityID  defines identity id object.
type IdentityID string

func(a IdentityID)String()string{
	return string(a)
}

// CarID  defines car id object.
type CarID string

func(a CarID)String()string{
	return string(a)
}

// BlobID defines blob id object
type BlobID string

func(a BlobID)String()string{
	return string(a)
}

