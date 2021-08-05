/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useRef, useState, useEffect } from "react"
import { Dialog, Transition } from "@headlessui/react"
import { ExclamationIcon } from "@heroicons/react/outline"
import { BlitzPage, Link, NotFoundError, Routes, useParam, useQuery } from "blitz"
import { format } from "date-fns"
import getTask from "app/queries/getTask"
import KeywordChip from "app/components/KeywordChip"
import { DATE_FORMAT } from "app/timeUtil"
import TaskView from "./TaskView"

type TaskModalProps = {
  open: boolean
  onClose: () => void
  taskId: number | null
}

const TaskModal = (props: TaskModalProps) => {
  let task = null

  // make initialFocus to prevent error
  const modalRef = useRef(null)

  const { open, onClose, taskId } = props

  // esc to close modal
  useEffect(() => {
    const close = (e) => {
      if (e.key == "Escape") {
        onClose()
      }
    }
    window.addEventListener("keydown", close)
    return () => window.removeEventListener("keydown", close)
  }, [])

  if (!open || !taskId) return null

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        static
        className="fixed z-10 inset-0 overflow-y-auto"
        initialFocus={modalRef}
        open={open}
        onClose={onClose}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="rounded-xl inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-screen-xl sm:w-full">
              <div className="bg-white">
                <div className="sm:flex sm:items-start">
                  <div className="card">
                    <div className="card-title" ref={modalRef}>
                      <h1>Task {taskId}</h1>
                    </div>
                    <div className="card-body">
                      <TaskView taskId={taskId} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default TaskModal
