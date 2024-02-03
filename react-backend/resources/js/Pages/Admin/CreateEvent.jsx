import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';

export default function CreateEvent({ auth, errors }) {
  const { data, setData, post, processing } = useForm({
    name: '',
    description: '',
    start_date: '',
    end_date: '',
    location_id: 1,
    category_id: 1,
    row: 1,
    column: 5,
    img: null,
    price: 0,
  });

  const [inputValue, setInputValue] = useState('');

  const formatNumber = (n) => {
    return n.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const formatCurrency = (e, blur) => {
    let inputVal = e.target.value;

    if (inputVal === '') {
      return;
    }

    const originalLen = inputVal.length;
    const caretPos = e.target.selectionStart;

    if (inputVal.indexOf('.') >= 0) {
      const decimalPos = inputVal.indexOf('.');
      let leftSide = inputVal.substring(0, decimalPos);
      let rightSide = inputVal.substring(decimalPos);

      leftSide = formatNumber(leftSide);
      rightSide = formatNumber(rightSide);

      if (blur === 'blur') {
        rightSide += '00';
      }

      rightSide = rightSide.substring(0, 2);

      inputVal = `$${leftSide}.${rightSide}`;
    } else {
      inputVal = formatNumber(inputVal);
      inputVal = `$${inputVal}`;

      if (blur === 'blur') {
        inputVal += '.00';
      }
    }

    setInputValue(inputVal);

    const updatedLen = inputVal.length;
    const newCaretPos = updatedLen - originalLen + caretPos;
    e.target.setSelectionRange(newCaretPos, newCaretPos);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(data);
    post('/createEvent', data);
  };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="">Create Event</h2>}
        >
            <Head title="Create Event" />

            <form onSubmit={handleSubmit}>
                <div>
                    <InputLabel htmlFor="name" value="Name" />
                    <TextInput
                        id="name"
                        type="text"
                        name="name"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        className=""
                        autoComplete="name"
                        isFocused={true}
                    />
                    <InputError message={errors.name} className="" />
                </div>

                <div className="">
                    <InputLabel htmlFor="description" value="Description" />
                    <textarea
                        id="description"
                        name="description"
                        value={data.description}
                        onChange={(e) => setData('description', e.target.value)}
                        className=""
                    ></textarea>
                    <InputError message={errors.description} className="" />
                </div>

                <div className="">
                    <InputLabel htmlFor="start_date" value="Start Date" />
                    <TextInput
                        id="start_date"
                        type="datetime-local"
                        name="start_date"
                        value={data.start_date}
                        onChange={(e) => setData('start_date', e.target.value)}
                        className=""
                        autoComplete="start_date"
                    />
                    <InputError message={errors.start_date} className="" />
                </div>

                <div className="">
                    <InputLabel htmlFor="end_date" value="End Date" />
                    <TextInput
                        id="end_date"
                        type="datetime-local"
                        name="end_date"
                        value={data.end_date}
                        onChange={(e) => setData('end_date', e.target.value)}
                        className=""
                        autoComplete="end_date"
                    />
                    <InputError message={errors.end_date} className="" />
                </div>

                <div className="">
                    <InputLabel htmlFor="location_id" value="Location" />
                    <select
                        id="location_id"
                        name="location_id"
                        value={data.location_id}
                        onChange={(e) => setData('location_id', e.target.value)}
                    >
                        <option value="1">Riga Plaze</option>
                        <option value="2">Estrāde</option>
                        <option value="3">Sporta Centrs</option>
                    </select>
                    <InputError message={errors.location} className="" />
                </div>

                <div className="">
                    <InputLabel htmlFor="category_id" value="Category" />
                    <select
                        id="category_id"
                        name="category_id"
                        value={data.category_id}
                        onChange={(e) => setData('category_id', e.target.value)}
                    >
                        <option value="1">Sports game</option>
                        <option value="2">Movie</option>
                        <option value="3">Concert</option>
                    </select>
                    <InputError message={errors.category} className="" />
                </div>

                <div className="">
                    <InputLabel htmlFor="row" value="Row" />
                    <TextInput
                        id="row"
                        type="number"
                        step="1"
                        min="1"
                        max="20"
                        name="row"
                        value={data.row}
                        onChange={(e) => setData('row', e.target.value)}
                        className=""
                        autoComplete="row"
                    />
                    <InputError message={errors.row} className="" />
                </div>

                <div className="">
                    <InputLabel htmlFor="column" value="Column" />
                    <TextInput
                        id="column"
                        type="number"
                        step="1"
                        min="5"
                        max='15'
                        name="column"
                        value={data.column}
                        onChange={(e) => setData('column', e.target.value)}
                        className=""
                        autoComplete="column"
                    />
                    <InputError message={errors.column} className="" />
                </div>

                <div className="">
                    <InputLabel htmlFor="img" value="Image" />
                    <TextInput
                        id="img"
                        type="url"
                        name="img"
                        onChange={(e) => setData('img', e.target.value)}
                        className=""
                        autoComplete="img"
                    />
                    <InputError message={errors.img} className="" />
                </div>

                <div className="">
                    <InputLabel htmlFor="price" value="Price" />
                    <TextInput
                        type="number"
                        name="price"
                        id="currency-field"
                        min='5'
                        max='2000'
                        step='0.01'
                        placeholder="10,0"
                        onChange={(e) => setData('price', e.target.value)}
                        className=""
                        autoComplete="price"
                    />
                    <InputError message={errors.price} className="" />
                </div>

                <div className="">
                    <PrimaryButton type="submit" className="" disabled={processing}>
                        Create
                    </PrimaryButton>
                </div>
            </form>
        </AuthenticatedLayout>
    );
}
