import { useState } from 'react';
import { Form, Link, useParams } from 'react-router-dom';
import Perks from '../Perks.jsx';
import axios from 'axios';

function AccomodatioPage() {
  const { action } = useParams();
  const [title, setTitle] = useState('');
  const [address, setAddress] = useState('');
  const [photos, setPhotos] = useState([]);
  const [photoLink, setPhotoLink] = useState('');
  const [description, setDescription] = useState('');
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [maxGuests, setMaxGuests] = useState(0);

  function header(text) {
    return <h2 className='mx-3 text-xl mt-3'>{text}</h2>;
  }

  async function addPhotoByLink(ev) {
    ev.preventDefault();
    const { data } = await axios.post('/upload-by-link', {
      Link: photoLink,
    });
    const photoName = data.path;
    setPhotos((prev) => {
      return [...prev, photoName];
    });
    setPhotoLink('');
  }

  function uploadPhoto(ev) {
    const files = ev.target.files;
    const data = new FormData();

    for (let i = 0; i < files.length; i++) {
      data.append('photos', files[i]);
    }
    axios
      .post('/upload', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        const { data: photoNameArray } = response;
        console.log(photoNameArray.photoNameArray);

        setPhotos((prev) => {
          return [...prev, ...photoNameArray.photoNameArray];
        });
      });
  }

  return (
    <div>
      {action !== 'new' && (
        <div className='text-center mt-6'>
          <Link
            className='inline-flex bg-primary rounded-full px-3 py-1 text-white'
            to={'/account/places/new'}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='currentColor'
              className='size-6'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M12 4.5v15m7.5-7.5h-15'
              />
            </svg>
            Add new Place
          </Link>
        </div>
      )}
      {action === 'new' && (
        <div className='flex justify-center'>
          <div className='mx-2'>
            <form>
              {header('Title')}
              <input
                type='text'
                placeholder='title of your Property'
                value={title}
                onChange={(ev) => setTitle(ev.target.value)}
              ></input>
              {header('Address')}
              <input
                type='text'
                placeholder='address'
                value={address}
                onChange={(ev) => setAddress(ev.target.value)}
              ></input>
              {header('Photos')}
              <div className='flex gap-2'>
                <input
                  type='text'
                  placeholder='Add using a link'
                  value={photoLink}
                  onChange={(ev) => setPhotoLink(ev.target.value)}
                ></input>
                <button
                  className='bg-gray-200 rounded-2xl px-4'
                  onClick={addPhotoByLink}
                >
                  Add&nbsp;Photo
                </button>
              </div>
              <div className='mt-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2'>
                {photos.length > 0 &&
                  photos.map((path) => (
                    <div>
                      <img
                        src={'http://localhost:3000/uploads/' + path}
                        className='rounded-2xl'
                      />
                    </div>
                  ))}
                <label className='cursor-pointer items-center flex justify-center gap-2 bg-transparent border rounded-3xl py-12 text-xl text-gray-500'>
                  <input
                    type='file'
                    className='hidden'
                    onChange={uploadPhoto}
                    multiple='true'
                  ></input>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke-width='1.5'
                    stroke='currentColor'
                    class='size-6'
                  >
                    <path
                      stroke-linecap='round'
                      stroke-linejoin='round'
                      d='M12 4.5v15m7.5-7.5h-15'
                    />
                  </svg>
                  Upload
                </label>
              </div>
              {header('Description')}
              <textarea
                class=' mt-2 block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-500 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                placeholder='description of your property.'
                value={description}
                onChange={(ev) => setDescription(ev.target.value)}
              ></textarea>
              {header('Perks')}
              <Perks selected={perks} onChange={setPerks} />
              {header('Extra Info')}
              <textarea
                class=' mt-2 block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-500 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                placeholder='extra info you need to add.'
                value={extraInfo}
                onChange={(ev) => setExtraInfo(ev.target.value)}
              ></textarea>
              {header('Check In & Out timings')}
              <div className='grid grid-cols-3 gap-3 mt-3'>
                <label>
                  <span className='mx-2'>CheckIn</span>
                  <input
                    type='text'
                    placeholder='14:00'
                    value={checkIn}
                    onChange={(ev) => setCheckIn(ev.target.value)}
                  ></input>
                </label>
                <label>
                  <span className='mx-2'>CheckOut</span>
                  <input
                    type='text'
                    placeholder='10:00'
                    value={checkOut}
                    onChange={(ev) => setCheckOut(ev.target.value)}
                  ></input>
                </label>
                <label>
                  <span className='mx-2'>Max number of Guests</span>
                  <input
                    type='number'
                    placeholder='4'
                    className='mt-1 px-3 py-2 border border-black rounded-full'
                    value={maxGuests}
                    onChange={(ev) => setMaxGuests(ev.target.value)}
                  ></input>
                </label>
              </div>
              <button className='mt-4 py-2 bg-primary w-full rounded-xl text-white'>
                Save
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AccomodatioPage;
