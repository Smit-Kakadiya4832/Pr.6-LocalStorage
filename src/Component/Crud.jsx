import { useEffect, useState } from "react";
const Crud = () => {
    const [isFormOpen, setIsFormOpen] = useState(false);

    const handleOpenForm = () => {
        setIsFormOpen(true);
    };

    const handleCloseForm = () => {
        setIsFormOpen(false);
    };

    const [input, setInput] = useState({
        name: '',
        phone : '',
        email: '',
        password : '',
        city : '',
        salary : ''
    })
    const [alldata, setAlldata] = useState([]);
    const [editid, setEditId] = useState("");
    const handleChange = (e) => {
        const { name, value } = e.target;
        setInput({
            ...input, [name]: value
        })
    }

    const handleSubmit = () => {
        if (editid) {
            let ans = alldata.filter((item) => {
                if (item.id == editid) {
                    item.name = input.name;
                    item.phone = input.phone;
                    item.email = input.email;
                    item.password = input.password;
                    item.city = input.city;
                    item.salary = input.salary;
                }
                return item
            })
            setAlldata(ans);
            setEditId("");
        } else {
            let obj = {
                id: Math.floor(Math.random() * 10000),
                name: input.name,
                phone: input.phone,
                email: input.email,
                password: input.password,
                city: input.city,
                salary: input.salary
            }
            let data = [...alldata, obj];
            setAlldata(data);
            localStorage.setItem('crud', JSON.stringify(data));
            alert("Record successfully insert");
        }
        setInput({
            name: '',
            phone : '',
            email: '',
            password: '',
            city: '',
            salary: '',
        })
    }

    const deleteData = (id) => {
        let ans = alldata.filter((item) => {
            return item.id !== id;
        })
        setAlldata(ans);
        localStorage.setItem('crud', JSON.stringify(ans));
        alert("Record successfully delete");
    }
    const editData = (id) => {
        let ans = alldata.filter((item) => {
            return item.id == id;
        })
        setEditId(id);
        setInput(ans[0]);

    }
    useEffect(() => {
        let all = JSON.parse(localStorage.getItem('crud'));
        if (all === null) {
            setAlldata([]);
        } else {
            setAlldata(all);
        }
    }, [])

    return (
        <center>
            {isFormOpen ? (
                <div>
                    <button onClick={handleCloseForm} className="btn btn-outline-secondary">Close Form</button>
                    <table border={1} class="table table-active pm-5">
                        <tbody>
                            <tr class="table-primary">
                                <td scope="row">Name :- </td>
                                <td><input type="text" name="name" onChange={handleChange} value={input.name} /></td>
                            </tr>
                            <tr>
                                <td>Phone :- </td>
                                <td><input type="text" name="phone" onChange={handleChange} value={input.phone} /></td>
                            </tr>
                            <tr>
                                <td>Email :- </td>
                                <td><input type="text" name="email" onChange={handleChange} value={input.email} /></td>
                            </tr>
                            <tr>
                                <td>Password :- </td>
                                <td><input type="text" name="password" onChange={handleChange} value={input.password} /></td>
                            </tr>
                            <tr>
                                <td>City :- </td>
                                <td><input type="text" name="city" onChange={handleChange} value={input.city} /></td>
                            </tr>
                            <tr>
                                <td>Salary :- </td>
                                <td><input type="text" name="salary" onChange={handleChange} value={input.salary} /></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>
                                    {
                                        editid ? (<input type="button" className="btn btn-outline-info" onClick={() => handleSubmit()} value="Edit" />)
                                            : (<input type="button" className="btn btn-outline-success" onClick={() => handleSubmit()} value="submit" />)
                                    }

                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            ) : (
                <button onClick={handleOpenForm} className="btn btn-outline-primary">Open Form</button>
            )}

            <br></br>


            <table border={1} class="table table-hover">
                <thead>
                    <tr class="table-primary">
                        <th scope="row">Id</th>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Email</th>
                        <th>Password</th>
                        <th>City</th>
                        <th>Salary</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        alldata.map((item) => {
                            const { id, name, phone, email, password, city, salary } = item;
                            return (
                                <tr key={id}>
                                    <td>{id}</td>
                                    <td>{name}</td>
                                    <td>{phone}</td>
                                    <td>{email}</td>
                                    <td>{password}</td>
                                    <td>{city}</td>
                                    <td>{salary}</td>
                                    <td>
                                        <button onClick={() => deleteData(id)} className="btn btn-outline-danger btn-sm">Delete</button>
                                        <button onClick={() => editData(id)} className="btn btn-outline-warning btn-sm">Edit</button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>

            </table>

        </center>
    )
}

export default Crud;