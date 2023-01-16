export type ChartName =
  | 'LineChart'
  | 'MultipleLineChart'
  | 'AreaChart'
  | 'ColumnChart'
  | 'GroupedColumnChart'
  | 'StackedColumnChart'
  | 'WaterFallChart'
  | 'BarChart'
  | 'PieChart'
  | 'RoseChart'
  | 'RadarChart'

export type OthersName = 'TextCpt'

export type CptName = ChartName | OthersName

export type ChartDataName = 'CoordinateData' | 'MappingData'

export type ChartConfigName =
  | 'LineConfig'
  | 'AreaConfig'
  | 'ColumnConfig'
  | 'WaterFallConfig'
  | 'PieConfig'
  | 'RadarConfig'

export type OthersConfigName = 'TextConfig'

export type CptConfigName = ChartConfigName | OthersConfigName
