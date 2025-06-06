export interface StaffInfoProps {
    fullName: string
    dob: string
    phoneNumber: string
    address: string
    salary: number
    position: string,
    imageUrl: string,
}
export interface StaffDTO {
  id: number;
  fullName: string;
  salary: number;
}