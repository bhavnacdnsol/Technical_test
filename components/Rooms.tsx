import { Room } from '../types/supabase-local';
import { useRouter } from 'next/router';
import Link from 'next/link';
import copy from 'copy-to-clipboard';
import { ClipboardCopyIcon } from '@heroicons/react/solid'

export default function RoomList({ rooms }: { rooms: Room[] }) {
  const router = useRouter()

  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Member link
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {rooms.map((room) => {
                  const baseurl = "https://session.adhdtogether.org.uk"
                  const path = `/${room.slug}`
                  const url = baseurl+path
                  return (
                    <tr key={room.id} className='hover:bg-gray-100 transition text-sm'>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className=" text-gray-900 text-bold">{room.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Link href={path} passHref>
                          <a className="underline text-blue-600 hover:text-red-600 ">
                            {url}
                          </a>
                        </Link>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {/* <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Active
                        </span> */}
                        <button
                          type="button"
                          className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          onClick={() => copy(url)}
                        >
                          <ClipboardCopyIcon className="-ml-1 mr-2 h-4 w-4 text-gray-500" aria-hidden="true" />
                          Copy link
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
