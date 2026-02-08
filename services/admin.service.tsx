import { apiRequest } from "@/services/api"

export interface Doctor {
  id: string
  firstName: string
  lastName: string
  email: string
  phone?: string
  specialty?: string
  status?: "pending" | "approved" | "rejected" | "active" | "inactive"
  createdAt?: string
  updatedAt?: string
}

export interface CreateDoctorPayload {
  firstName: string
  lastName: string
  email: string
  phone?: string
  specialty?: string
}

export interface UpdateDoctorPayload {
  firstName?: string
  lastName?: string
  email?: string
  phone?: string
  specialty?: string
  status?: "pending" | "approved" | "rejected" | "active" | "inactive"
}

export interface DoctorListResponse {
  doctors: Doctor[]
  total?: number
  page?: number
  pageSize?: number
}

export interface ApiResult<T> {
  data: T | null
  success: boolean
  message: string
}

const DOCTOR_BASE_PATH = "/admin/doctors"

function resolveErrorMessage(error: unknown, fallback: string): string {
  if (error instanceof Error && error.message.trim().length > 0) {
    return error.message
  }

  return fallback
}

export async function createDoctor(
  payload: CreateDoctorPayload,
): Promise<ApiResult<Doctor>> {
  try {
    const data = await apiRequest<Doctor>(DOCTOR_BASE_PATH, {
      method: "POST",
      data: payload,
    })

    return {
      data,
      success: true,
      message: "Doctor created successfully.",
    }
  } catch (error) {
    console.error("Failed to create doctor", error)

    return {
      data: null,
      success: false,
      message: resolveErrorMessage(
        error,
        "Unable to create doctor. Please try again.",
      ),
    }
  }
}

export async function getDoctors(
  params?: {
    page?: number
    pageSize?: number
    search?: string
    status?: string
  },
): Promise<ApiResult<DoctorListResponse>> {
  try {
    const searchParams = new URLSearchParams()

    if (params?.page !== undefined) {
      searchParams.set("page", params.page.toString())
    }

    if (params?.pageSize !== undefined) {
      searchParams.set("pageSize", params.pageSize.toString())
    }

    if (params?.search) {
      searchParams.set("search", params.search)
    }

    if (params?.status) {
      searchParams.set("status", params.status)
    }

    const queryString = searchParams.toString()
    const endpoint = queryString
      ? `${DOCTOR_BASE_PATH}?${queryString}`
      : DOCTOR_BASE_PATH

    const data = await apiRequest<DoctorListResponse>(endpoint, {
      method: "GET",
    })

    return {
      data,
      success: true,
      message: "Doctors fetched successfully.",
    }
  } catch (error) {
    console.error("Failed to fetch doctors", error)

    return {
      data: null,
      success: false,
      message: resolveErrorMessage(
        error,
        "Unable to fetch doctors. Please try again.",
      ),
    }
  }
}

export async function getDoctorById(
  doctorId: string,
): Promise<ApiResult<Doctor>> {
  try {
    const data = await apiRequest<Doctor>(
      `${DOCTOR_BASE_PATH}/${doctorId}`,
      {
        method: "GET",
      },
    )

    return {
      data,
      success: true,
      message: "Doctor fetched successfully.",
    }
  } catch (error) {
    console.error("Failed to fetch doctor", error)

    return {
      data: null,
      success: false,
      message: resolveErrorMessage(
        error,
        "Unable to fetch doctor details. Please try again.",
      ),
    }
  }
}

export async function updateDoctor(
  doctorId: string,
  payload: UpdateDoctorPayload,
): Promise<ApiResult<Doctor>> {
  try {
    const data = await apiRequest<Doctor>(
      `${DOCTOR_BASE_PATH}/${doctorId}`,
      {
        method: "PATCH",
        data: payload,
      },
    )

    return {
      data,
      success: true,
      message: "Doctor updated successfully.",
    }
  } catch (error) {
    console.error("Failed to update doctor", error)

    return {
      data: null,
      success: false,
      message: resolveErrorMessage(
        error,
        "Unable to update doctor. Please try again.",
      ),
    }
  }
}

export async function deleteDoctor(
  doctorId: string,
): Promise<ApiResult<{ success: boolean }>> {
  try {
    const data = await apiRequest<{ success: boolean }>(
      `${DOCTOR_BASE_PATH}/${doctorId}`,
      {
        method: "DELETE",
      },
    )

    return {
      data,
      success: true,
      message: "Doctor deleted successfully.",
    }
  } catch (error) {
    console.error("Failed to delete doctor", error)

    return {
      data: null,
      success: false,
      message: resolveErrorMessage(
        error,
        "Unable to delete doctor. Please try again.",
      ),
    }
  }
}
