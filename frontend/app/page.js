"use client";
import {
  Select,
  SelectTrigger,
  SelectValue,
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  Alert,
  AlertTitle,
  AlertDescription,
  AlertDialogAction,
  SelectContent,
  SelectItem,
  Toaster,
  RadioGroup,
  RadioGroupItem,
  useToast,
  LoadingScreen,
  DataTable,
  DataTableColumnHeader,
  Badge,
  Input,
  Button,
} from "@rohitgadekar/kimui";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
  const { toast } = useToast();
  const [data, setData] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [searchKey, setSearchKey] = useState("firstName");
  const [connect, setConnect] = useState(false);

  const fetchStudents = () => {
    axios
      .get("http://localhost:8080/api/v2/students")
      .then((res) => {
        setData(res.data.data);
      })
      .catch((error) => console.error("Error fetching students:", error));
  };

  useEffect(() => {
    fetchStudents();
  }, [refresh]);

  const camelToTitle = (str) => {
    return str
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (match) => match.toUpperCase());
  };

  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    gender: null,
    dob: "",
    major: "",
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = () => {
    axios
      .post(`http://localhost:8080/api/v2/student`, formData)
      .then((res) => {
        if (res.data.status === 200) {
          toast({
            title: "Success",
            description: "Student added successfully",
          });
          setRefresh((prev) => !prev);
          setFormData({
            firstName: "",
            lastName: "",
            gender: "",
            dob: "",
            major: "",
          });
          setErrors({});
          setIsOpen(false);
        }
      })
      .catch((error) => {
        if (error.response?.data?.data) {
          setErrors(error.response.data.data);
        } else {
          toast({
            title: "Error",
            description: "Failed to add student empty fields",
            variant: "destructive",
          });
        }
      });
  };

  const userColumns = [
    {
      accessorKey: "firstName",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="First Name" />
      ),
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "lastName",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Last Name" />
      ),
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "gender",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Gender" />
      ),
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "dob",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="DOB" />
      ),
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "prn",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="PRN" />
      ),
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "major",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Major" />
      ),
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "actions",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Actions" />
      ),
      cell: (info) => {
        const student = info.row.original;

        const [formData, setFormData] = useState({
          firstName: student.firstName,
          lastName: student.lastName,
          gender: student.gender,
          dob: student.dob,
          major: student.major,
        });
        const handleInputChange = (e) => {
          const { name, value } = e.target;
          setFormData((prev) => ({ ...prev, [name]: value }));
        };

        return (
          <div className="flex flex-wrap gap-2">
            <AlertDialog>
              <AlertDialogTrigger>
                <Badge>Edit</Badge>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Edit Student</AlertDialogTitle>
                  <AlertDialogDescription
                    asChild
                    className="p-1 pt-4 mx-2 space-y-4 overflow-auto"
                  >
                    <div>
                      <Input
                        name="firstName"
                        value={formData.firstName}
                        type="text"
                        onChange={handleInputChange}
                        placeholder="Enter First Name"
                      />
                      <Input
                        name="lastName"
                        value={formData.lastName}
                        type="text"
                        onChange={handleInputChange}
                        placeholder="Enter Last Name"
                      />
                      <RadioGroup
                        value={formData.gender}
                        onValueChange={(value) =>
                          setFormData((prev) => ({ ...prev, gender: value }))
                        }
                        className="flex flex-row p-2"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="MALE" id="MALE" />
                          <label htmlFor="MALE">MALE</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="FEMALE" id="FEMALE" />
                          <label htmlFor="FEMALE">FEMALE</label>
                        </div>
                      </RadioGroup>
                      <Input
                        name="dob"
                        value={formData.dob}
                        onChange={handleInputChange}
                        type="date"
                        placeholder="Enter date"
                      />
                      <Select
                        value={formData.major}
                        onValueChange={(value) => {
                          setFormData((prev) => ({ ...prev, major: value }));
                        }}
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select Major" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Physics">Physics</SelectItem>
                          <SelectItem value="Mathematics">
                            Mathematics
                          </SelectItem>
                          <SelectItem value="Computer Science">
                            Computer Science
                          </SelectItem>
                          <SelectItem value="Biology">Biology</SelectItem>
                          <SelectItem value="Engineering">
                            Engineering
                          </SelectItem>
                          <SelectItem value="History">History</SelectItem>
                          <SelectItem value="Chemistry">Chemistry</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Close</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => {
                      axios
                        .put(
                          `http://localhost:8080/api/v2/student/${student.id}`,
                          formData
                        )
                        .then((res) => {
                          toast({
                            title: "Success",
                            description: "Student Updated successfully",
                          });
                          setRefresh((prev) => !prev);
                        })
                        .catch((error) =>
                          console.error("Error updating student:", error)
                        );
                    }}
                  >
                    Save
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            <AlertDialog>
              <AlertDialogTrigger>
                <Badge variant="destructive">Delete</Badge>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    your data.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => {
                      axios
                        .delete(
                          `http://localhost:8080/api/v2/student/${student.id}`
                        )
                        .then((res) => {
                          toast({
                            title: "Success",
                            description: "Student deleted successfully",
                          });
                          setRefresh((prev) => !prev);
                        });
                    }}
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        );
      },
    },
  ];

  if (data.length <= 0 && !connect) return <LoadingScreen />;

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20">
      <main className="flex flex-col gap-1 row-start-2 items-center sm:items-start">
        <span className=" w-full flex flex-row justify-between ">
          <Select
            value={searchKey}
            onValueChange={(value) => {
              setSearchKey(value);
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Change Search Key" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="firstName">First Name</SelectItem>
              <SelectItem value="lastName">Last Name</SelectItem>
              <SelectItem value="gender">Gender</SelectItem>
              <SelectItem value="dob">DOB</SelectItem>
              <SelectItem value="prn">PRN</SelectItem>
              <SelectItem value="major">Major</SelectItem>
            </SelectContent>
          </Select>
          <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
            <AlertDialogTrigger asChild>
              <Button
                variant="outline"
                className="w-fit"
                onClick={() => setIsOpen(true)}
              >
                Add Student
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Add Student</AlertDialogTitle>
                <AlertDialogDescription
                  asChild
                  className="p-1 pt-4 mx-2 space-y-4 overflow-auto"
                >
                  <div>
                    <Input
                      name="firstName"
                      type="text"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="Enter First Name"
                    />
                    {errors.firstName && (
                      <p className="text-red-500 pl-2">{errors.firstName}</p>
                    )}
                    <Input
                      name="lastName"
                      type="text"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="Enter Last Name"
                    />
                    {errors.lastName && (
                      <p className="text-red-500 pl-2">{errors.lastName}</p>
                    )}
                    <RadioGroup
                      value={formData.gender}
                      onValueChange={(value) =>
                        setFormData((prev) => ({ ...prev, gender: value }))
                      }
                      className="flex flex-row p-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="MALE" id="MALE" />
                        <label htmlFor="MALE">MALE</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="FEMALE" id="FEMALE" />
                        <label htmlFor="FEMALE">FEMALE</label>
                      </div>
                    </RadioGroup>
                    {errors.gender && (
                      <p className="text-red-500 pl-2">{errors.gender}</p>
                    )}
                    <Input
                      name="dob"
                      value={formData.dob}
                      onChange={handleInputChange}
                      type="date"
                      placeholder="Enter date"
                    />
                    {errors.dob && (
                      <p className="text-red-500 pl-2">{errors.dob}</p>
                    )}
                    <Select
                      value={formData.major}
                      onValueChange={(value) =>
                        setFormData((prev) => ({ ...prev, major: value }))
                      }
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select Major" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Physics">Physics</SelectItem>
                        <SelectItem value="Mathematics">Mathematics</SelectItem>
                        <SelectItem value="Computer Science">
                          Computer Science
                        </SelectItem>
                        <SelectItem value="Biology">Biology</SelectItem>
                        <SelectItem value="Engineering">Engineering</SelectItem>
                        <SelectItem value="History">History</SelectItem>
                        <SelectItem value="Chemistry">Chemistry</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.major && (
                      <p className="text-red-500 pl-2">{errors.major}</p>
                    )}
                  </div>
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel onClick={() => setIsOpen(false)}>
                  Close
                </AlertDialogCancel>
                <Button onClick={handleSubmit}>Save</Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </span>
        <Alert className="mt-2" variant="destructive">
          <AlertTitle>
            Search key is set to {camelToTitle(searchKey)}
          </AlertTitle>
        </Alert>
        {data.length > 0 && (
          <DataTable columns={userColumns} data={data} searchKey={searchKey} />
        )}
      </main>
      <Toaster />
    </div>
  );
}
