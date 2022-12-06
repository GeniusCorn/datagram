import { defineStore } from 'pinia'
import { Rect } from '@/types/Rect'

interface element {
  x: number
  y: number
  width: number
  height: number
  isActive: boolean
  cptType: string
  options: object
}

export const useDataStore = defineStore('data', () => {
  const elementsList: element[] = $ref([])

  function addElement(cptType: string, options: object): void {
    elementsList.push({
      x: 40,
      y: 90,
      width: 200,
      height: 200,
      isActive: false,
      cptType,
      options
    })
  }

  function changeElementSize(newRect: Rect, index: number): void {
    elementsList[index].width = newRect.width
    elementsList[index].height = newRect.height
  }

  function changeElementPosition(newRect: Rect, index: number): void {
    elementsList[index].x = newRect.left
    elementsList[index].y = newRect.top
  }

  function setElementActive(index: number): void {
    elementsList.forEach((element) => {
      element.isActive = false
    })

    elementsList[index].isActive = true
  }

  function unsetElementActive(): void {
    elementsList.forEach((element) => {
      element.isActive = false
    })
  }

  return $$({
    elementsList,
    addElement,
    changeElementSize,
    changeElementPosition,
    setElementActive,
    unsetElementActive
  })
})
